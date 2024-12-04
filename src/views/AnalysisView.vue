<template>
    <div class="a4-page analysis-page">
      <div class="page-container">
        <!-- Header Section -->
        <div class="header-section">
          <h1 class="title">Matematik Analizin</h1>
          <p class="info-text">
            Bu analiz, MATEMATİK sınavlarındaki performansını inceliyor. Güçlü ve geliştirilebilir yönlerin dikkate alınarak hazırlandı. Henüz denemediğin konularda da dengeli bir soru seçkisi oluşturduk. Bu analiz, matematik yolculuğunda sana rehberlik edecek.
          </p>
        </div>
  
        <!-- Stats Overview -->
        <div class="stats-container">
          <div class="stats-grid">
            <div v-for="(stat, index) in stats" :key="index" class="stat-card">
              <div class="stat-icon">{{ stat.icon }}</div>
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
  
        <!-- Analysis Table -->
        <div class="analysis-table-container">
          <table class="analysis-table">
            <thead>
              <tr>
                <th>Konu</th>
                <th>Doğru</th>
                <th>Yanlış</th>
                <th>Boş</th>
                <th>Net</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(topic, index) in topics" :key="index" :class="getTopicClass(topic.successRate)">
                <td>{{ topic.name }}</td>
                <td>{{ topic.correct }}</td>
                <td>{{ topic.incorrect }}</td>
                <td>{{ topic.empty }}</td>
                <td>{{ topic.net }}</td>
                <td>
                  <div class="performance-indicator" :class="getPerformanceClass(topic.successRate)">
                    {{ getPerformanceText(topic.successRate) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Bottom Section -->
        <div class="bottom-section">
          <!-- Quote -->
          <div class="quote-section">
            <blockquote>
              <p>"{{ quote.text }}"</p>
              <footer>- {{ quote.author }}</footer>
            </blockquote>
          </div>
  
          <div class="bottom-grid">
            <!-- Top 5 Subjects -->
            <div class="grid-item top-subjects">
              <h2>🏆 Matematikte En İyi Olduğun 5 Konu</h2>
              <ol>
                <li v-for="topic in topFiveSubjects" :key="topic">{{ topic }}</li>
              </ol>
            </div>
  
            <!-- Recommendations -->
            <div class="grid-item recommendations">
              <h2>💡 Kişisel Öneriler</h2>
              <ul>
                <li v-for="(recommendation, index) in personalizedRecommendations" :key="index">
                  {{ recommendation }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const topics = [
    { name: 'Saymanın Kuralları', correct: 7, incorrect: 3, empty: 2, net: 5, successRate: 85 },
    { name: 'Permütasyon', correct: 6, incorrect: 3, empty: 1, net: 5.3, successRate: 75 },
    { name: 'Kombinasyon', correct: 8, incorrect: 8, empty: 0, net: 6, successRate: 65 },
    { name: 'Binom Açılım', correct: 3, incorrect: 3, empty: 4, net: 2.3, successRate: 45 },
    { name: 'Basit Olayların Olasılığı', correct: 6, incorrect: 3, empty: 1, net: 5.3, successRate: 82 },
    { name: 'Fonksiyon Kavramı', correct: 1, incorrect: 1, empty: 3, net: 0.8, successRate: 35 },
    { name: 'Fonksiyonlarda İşlem', correct: 5, incorrect: 1, empty: 0, net: 4.8, successRate: 88 },
    { name: 'Fonksiyon Türleri', correct: 5, incorrect: 1, empty: 2, net: 4.8, successRate: 92 },
  ];
  
  const quote = {
    text: "Matematik, zorlukların üstesinden gelme sanatıdır. Her hata, yeni bir öğrenme fırsatıdır.",
    author: "Anonim"
  };
  
  const totalQuestions = computed(() => {
    return topics.reduce((sum, topic) => sum + topic.correct + topic.incorrect, 0);
  });
  
  const successRate = computed(() => {
    const totalCorrect = topics.reduce((sum, topic) => sum + topic.correct, 0);
    return Math.round((totalCorrect / totalQuestions.value) * 100);
  });
  
  const percentageAboveAverage = 15;
  const totalStudyTime = 120;
  const examCount = 5;
  
  const strongestTopic = computed(() => {
    return topics.reduce((strongest, topic) => 
      topic.successRate > (strongest?.successRate || 0) ? topic : strongest
    ).name;
  });
  
  const topFiveSubjects = computed(() => {
    return [...topics]
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 5)
      .map(topic => topic.name);
  });
  
  const stats = [
    { icon: '📚', value: totalQuestions, label: 'Toplam Soru' },
    { icon: '🎯', value: `${successRate.value}%`, label: 'Başarı Oranı' },
    { icon: '🚀', value: `${percentageAboveAverage}%`, label: 'Ortalama Üstü' },
    { icon: '💪', value: strongestTopic, label: 'En Güçlü Konu' },
    { icon: '⏱️', value: `${totalStudyTime} saat`, label: 'Çalışma Süresi' },
    { icon: '📝', value: examCount, label: 'Sınav Sayısı' },
  ];
  
  const getTopicClass = (successRate) => {
    if (successRate >= 80) return 'high-performance';
    if (successRate >= 50) return 'medium-performance';
    return 'low-performance';
  };
  
  const getPerformanceClass = (successRate) => {
    if (successRate >= 80) return 'performance-high';
    if (successRate >= 50) return 'performance-medium';
    return 'performance-low';
  };
  
  const getPerformanceText = (successRate) => {
    if (successRate >= 80) return 'Güçlü';
    if (successRate >= 50) return 'Gelişmekte';
    return 'Geliştirilmeli';
  };
  
  const personalizedRecommendations = [
    'Binom Açılım konusunda daha fazla pratik yapmanı öneriyoruz.',
    'Fonksiyon Kavramı üzerine yoğunlaşman başarını artırabilir.',
    'Güçlü olduğun Fonksiyon Türleri konusunda ileri seviye sorular çözebilirsin.',
  ];
  </script>
  
  <style scoped>
  .a4-page {
    width: 595px;
    height: 842px;
    margin: 0 auto;
    padding: 16px;
    box-sizing: border-box;
    font-size: 9px;
    background-color: #f7fafc;
    overflow: hidden;
  }
  
  .page-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .header-section {
    text-align: center;
  }
  
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 2px;
  }
  
  .subtitle {
    font-size: 10px;
    color: #4a5568;
  }
  
  .info-text {
    font-size: 8px;
    color: #4a5568;
    margin-top: 2px;
    text-align: justify;
    line-height: 1.2;
  }
  
  .stats-container {
    margin-bottom: 8px;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  
  .stat-card {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    padding: 8px;
    border-radius: 4px;
    text-align: center;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  
  .stat-icon {
    font-size: 14px;
    margin-bottom: 2px;
  }
  
  .stat-value {
    font-size: 12px;
    font-weight: bold;
    color: #2d3748;
  }
  
  .stat-label {
    font-size: 8px;
    color: #4a5568;
  }
  
  .analysis-table-container {
    width: 100%;
    margin: 4px 0;
  }
  
  .analysis-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .analysis-table th,
  .analysis-table td {
    padding: 4px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
    font-size: 8px;
  }
  
  .analysis-table th {
    background-color: #edf2f7;
    font-weight: bold;
    color: #2d3748;
  }
  
  .high-performance { background-color: #c6f6d5; }
  .medium-performance { background-color: #fefcbf; }
  .low-performance { background-color: #fed7d7; }
  
  .performance-indicator {
    display: inline-block;
    padding: 2px 4px;
    border-radius: 9999px;
    font-size: 7px;
    font-weight: bold;
  }
  
  .performance-high { background-color: #48bb78; color: #ffffff; }
  .performance-medium { background-color: #ecc94b; color: #744210; }
  .performance-low { background-color: #f56565; color: #ffffff; }
  
  .bottom-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .quote-section {
    background-color: #ebf8ff;
    border-radius: 4px;
    padding: 8px;
    text-align: center;
  }
  
  .quote-section blockquote {
    margin: 0;
  }
  
  .quote-section p {
    font-size: 9px;
    color: #2b6cb0;
    font-style: italic;
    margin-bottom: 2px;
  }
  
  .quote-section footer {
    font-size: 8px;
    color: #4a5568;
  }
  
  .bottom-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  
  .grid-item {
    background-color: #fff;
    border-radius: 4px;
    padding: 8px;
    font-size: 8px;
  }
  
  .grid-item h2 {
    font-size: 10px;
    font-weight: bold;
    color: #2b6cb0;
    margin-bottom: 4px;
  }
  
  .top-subjects {
    background-color: #ebf8ff;
  }
  
  .top-subjects ol {
    padding-left: 16px;
    margin: 0;
  }
  
  .top-subjects li {
    color: #2d3748;
    margin-bottom: 2px;
  }
  
  .recommendations {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  }
  
  .recommendations ul {
    padding-left: 16px;
    margin: 0;
  }
  
  .recommendations li {
    color: #4a5568;
    margin-bottom: 2px;
  }
  </style>
  
  