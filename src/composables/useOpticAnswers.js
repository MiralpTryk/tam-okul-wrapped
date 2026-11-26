import { reactive } from 'vue'

// Ağ hatası ve 5xx için yeniden deneme beklemeleri (ms)
const RETRY_DELAYS = [2000, 5000, 10000]
const DEFAULT_RETRY_AFTER_SECONDS = 5
const LEGACY_KEYS = ['optikFormAnswers', 'savedPages', 'optikFormCompleted']

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)

const isValidAnswer = (value) => Number.isInteger(value) && value >= 0 && value <= 4

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (error) {
    return fallback
  }
}

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

const removeStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    // yok say
  }
}

/**
 * optic.answers listesini soru kimliğine göre toplar.
 * Her elemanın her dersinin her sayfasındaki her soru okunur; courses'ta
 * bulunmayan ders, sayfa ya da soru ve sayı olmayan cevaplar yok sayılır.
 * Dönüş: Map<soru id (metin), şık sırası (0-4)>
 */
export const collectServerAnswers = (answers, courses) => {
  const result = new Map()
  if (!Array.isArray(answers) || !Array.isArray(courses)) return result

  const known = {}
  courses.forEach(course => {
    const pages = {}
    Object.entries(course.pages || {}).forEach(([page, pageQuestions]) => {
      pages[String(page)] = new Set(Object.values(pageQuestions || {}).map(q => String(q.id)))
    })
    known[course.title] = pages
  })

  answers.forEach(element => {
    if (!isPlainObject(element)) return
    Object.entries(element).forEach(([title, pages]) => {
      if (!known[title] || !isPlainObject(pages)) return
      Object.entries(pages).forEach(([page, pageAnswers]) => {
        const knownIds = known[title][String(page)]
        if (!knownIds || !isPlainObject(pageAnswers)) return
        Object.entries(pageAnswers).forEach(([questionId, entry]) => {
          if (!knownIds.has(String(questionId)) || !isPlainObject(entry)) return
          if (isValidAnswer(entry.answer)) {
            result.set(String(questionId), entry.answer)
          }
        })
      })
    })
  })

  return result
}

/**
 * QR sayfasındaki cevapların sunucuyla eşitlenmesi.
 * Her soru için yalnız son işlem tutulur; bir sorunun isteği bitmeden
 * o soru için yenisi gönderilmez. Gönderilemeyen işlemler
 * koksis:{kod}:pending altında bekler.
 */
export function useOpticAnswers(code, { onError } = {}) {
  const keys = {
    pending: `koksis:${code}:pending`,
    favorites: `koksis:${code}:favorites`,
    revealed: `koksis:${code}:revealed`
  }

  // soru id -> 'saving' | 'saved' | 'error'
  const status = reactive({})
  // soru id -> { id, title, page, correct, answer, seq }
  const pending = {}
  const inFlight = new Set()
  let seq = 0
  let readOnly = false

  LEGACY_KEYS.forEach(removeStorage)

  const persistPending = () => {
    const stored = {}
    Object.values(pending).forEach(({ id, title, page, correct, answer }) => {
      stored[id] = { id, title, page, correct, answer }
    })
    if (Object.keys(stored).length) {
      writeStorage(keys.pending, stored)
    } else {
      removeStorage(keys.pending)
    }
  }

  const loadPending = () => {
    const stored = readStorage(keys.pending, {})
    return isPlainObject(stored) ? Object.values(stored).filter(isPlainObject) : []
  }

  const isCurrent = (op) => pending[op.id] && pending[op.id].seq === op.seq

  const post = (op) => {
    const entry = op.answer === null
      ? { id: op.id, correct: op.correct, answer: null, cleared: true }
      : { id: op.id, correct: op.correct, answer: op.answer }
    const answers = [{ [op.title]: { [String(op.page)]: { [String(op.id)]: entry } } }]

    return fetch(`${window.location.origin}/api/koksis/submit-optic-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ code, answers: JSON.stringify(answers) })
    })
  }

  // 'ok' | 'fatal' | 'failed' | 'superseded'
  const sendWithRetry = async (op) => {
    for (let attempt = 0; ; attempt++) {
      if (!isCurrent(op)) return 'superseded'

      let response = null
      try {
        response = await post(op)
      } catch (error) {
        response = null
      }

      if (response && response.status === 201) return 'ok'
      if (response && response.status >= 400 && response.status < 500 && response.status !== 429) return 'fatal'
      if (attempt >= RETRY_DELAYS.length) return 'failed'

      let delay = RETRY_DELAYS[attempt]
      if (response && response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After'), 10)
        delay = (Number.isFinite(retryAfter) ? retryAfter : DEFAULT_RETRY_AFTER_SECONDS) * 1000
      }
      await sleep(delay)
    }
  }

  const drain = async (id) => {
    if (inFlight.has(id)) return
    inFlight.add(id)
    try {
      while (pending[id]) {
        const op = pending[id]
        status[id] = 'saving'
        const result = await sendWithRetry(op)

        // Gönderim sürerken aynı soruda yeni bir işlem geldiyse onu gönder
        if (!isCurrent(op)) continue

        if (result === 'ok') {
          delete pending[id]
          if (op.answer === null) {
            delete status[id]
          } else {
            status[id] = 'saved'
          }
        } else if (result === 'fatal') {
          delete pending[id]
          status[id] = 'error'
          onError?.()
        } else {
          // İşlem bekleme listesinde kalır; bağlantı gelince ya da sayfa açılınca gönderilir
          status[id] = 'error'
          onError?.()
          break
        }
        persistPending()
      }
    } finally {
      inFlight.delete(id)
    }
  }

  /**
   * Bir sorunun cevabını kaydeder. answer: 0-4 ya da silmek için null.
   */
  const submit = (question, answer) => {
    if (readOnly) return
    const id = String(question.id)
    pending[id] = {
      id: question.id,
      title: question.title,
      page: question.page,
      correct: Number(question.correct_answer),
      answer,
      seq: ++seq
    }
    status[id] = 'saving'
    persistPending()
    drain(id)
  }

  const retry = (question) => {
    if (readOnly) return
    const id = String(question.id)
    if (pending[id]) {
      drain(id)
    } else {
      submit(question, question.answer === null ? null : Number(question.answer))
    }
  }

  const flushPending = () => {
    if (readOnly) return
    Object.keys(pending).forEach(drain)
  }

  /**
   * Açılışta çağrılır: sunucudaki cevapları ve bu kitapta gönderilmemiş
   * yerel işlemleri birleştirir. Dönüş: Map<soru id (metin), şık sırası | null>
   */
  const init = ({ courses, answers, readOnly: isReadOnly }, questionsById) => {
    readOnly = isReadOnly === true
    Object.keys(status).forEach(id => delete status[id])

    const merged = new Map()
    collectServerAnswers(answers, courses).forEach((answer, id) => {
      merged.set(id, answer)
      status[id] = 'saved'
    })

    if (readOnly) return merged

    loadPending().forEach(op => {
      const id = String(op.id)
      const question = questionsById.get(id)
      if (!question || (op.answer !== null && !isValidAnswer(op.answer))) return
      pending[id] = {
        id: question.id,
        title: question.title,
        page: question.page,
        correct: Number(question.correct_answer),
        answer: op.answer,
        seq: ++seq
      }
      merged.set(id, op.answer)
      status[id] = 'saving'
    })
    persistPending()
    flushPending()

    return merged
  }

  const loadFavorites = () => {
    const stored = readStorage(keys.favorites, [])
    return new Set(Array.isArray(stored) ? stored.map(String) : [])
  }

  const saveFavorites = (ids) => writeStorage(keys.favorites, [...ids])

  const loadRevealed = () => {
    const stored = readStorage(keys.revealed, [])
    return new Set(Array.isArray(stored) ? stored.map(String) : [])
  }

  const saveRevealed = (pageKeys) => writeStorage(keys.revealed, [...pageKeys])

  window.addEventListener('online', flushPending)
  const dispose = () => window.removeEventListener('online', flushPending)

  return {
    status,
    init,
    submit,
    retry,
    flushPending,
    loadFavorites,
    saveFavorites,
    loadRevealed,
    saveRevealed,
    dispose
  }
}
