import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { TrendingUp, Newspaper, Loader2 } from 'lucide-react';

// Interfaces
interface NewsItem {
  title: string;
  description: string;
  url: string;
  date?: string;
}

interface MarketData {
  symbol: string;
  price: string;
  changePercent: string;
  trend: 'up' | 'down';
}

interface CardContentProps {
  type: 'news' | 'market';
}

const InfoBanner = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentMarketIndex, setCurrentMarketIndex] = useState(0);
  const [isNewsLoading, setIsNewsLoading] = useState(true);
  const [isMarketLoading, setIsMarketLoading] = useState(true);

  // Fetch news data from a CORS-friendly endpoint
  const fetchNews = useCallback(async () => {
    setIsNewsLoading(true);
    try {
      // Using NewsAPI's everything endpoint with a proxy
      const response = await fetch('https://api.allorigins.win/raw?url=' + 
        encodeURIComponent('https://newsapi.org/v2/everything?q=technology+OR+AI+OR+robotics&language=en&sortBy=publishedAt&pageSize=10&apiKey=0ff0f9f70def4f7399621f63a9f98479')
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      if (data.articles && Array.isArray(data.articles)) {
        const formattedNews: NewsItem[] = data.articles.map((article: { title: unknown; description: unknown; url: unknown; publishedAt: unknown; }) => ({
          title: article.title || 'Breaking Tech News',
          description: article.description || 'Latest updates in technology...',
          url: article.url || 'https://news.google.com/search?q=technology',
          date: article.publishedAt
        })).filter((article: { title: unknown; description: unknown; }) => article.title && article.description);

        setNews(formattedNews);
      }
    } catch (error) {
      console.error('News fetch error:', error);
      // Fallback news data
      const fallbackNews: NewsItem[] = [
        {
          title: "AI Breakthroughs in Robotics Development",
          description: "Latest developments in AI-powered robotics show promising results in adaptive learning and real-world applications...",
          url: "https://news.google.com/search?q=AI+robotics",
          date: new Date().toISOString()
        },
        {
          title: "Quantum Computing Reaches New Milestone",
          description: "Scientists achieve significant breakthrough in quantum computing stability, marking a major step forward...",
          url: "https://news.google.com/search?q=quantum+computing",
          date: new Date().toISOString()
        },
        {
          title: "Autonomous Systems Transform Manufacturing",
          description: "Industry 4.0 adoption accelerates as autonomous systems demonstrate unprecedented efficiency gains...",
          url: "https://news.google.com/search?q=industry+4.0",
          date: new Date().toISOString()
        }
      ];
      setNews(fallbackNews);
    } finally {
      setIsNewsLoading(false);
    }
  }, []);

  // Fetch market data with simulated updates
  const fetchMarketData = useCallback(() => {
    setIsMarketLoading(true);
    try {
      const stockData: MarketData[] = [
        { 
          symbol: "NVDA", 
          price: (Math.random() * (800 - 700) + 700).toFixed(2), 
          changePercent: (Math.random() * 5).toFixed(2), 
          trend: Math.random() > 0.5 ? 'up' : 'down' 
        },
        { 
          symbol: "TSLA", 
          price: (Math.random() * (300 - 200) + 200).toFixed(2), 
          changePercent: (Math.random() * 4).toFixed(2), 
          trend: Math.random() > 0.5 ? 'up' : 'down' 
        },
        { 
          symbol: "AAPL", 
          price: (Math.random() * (200 - 150) + 150).toFixed(2), 
          changePercent: (Math.random() * 3).toFixed(2), 
          trend: Math.random() > 0.5 ? 'up' : 'down' 
        },
        { 
          symbol: "MSFT", 
          price: (Math.random() * (400 - 350) + 350).toFixed(2), 
          changePercent: (Math.random() * 2.5).toFixed(2), 
          trend: Math.random() > 0.5 ? 'up' : 'down' 
        },
        { 
          symbol: "GOOGL", 
          price: (Math.random() * (150 - 120) + 120).toFixed(2), 
          changePercent: (Math.random() * 3.5).toFixed(2), 
          trend: Math.random() > 0.5 ? 'up' : 'down' 
        }
      ];

      setMarketData(stockData);
    } catch (error) {
      console.error('Market data fetch error:', error);
    } finally {
      setIsMarketLoading(false);
    }
  }, []);

  // Initial data fetch and refresh intervals
  useEffect(() => {
    fetchNews();
    fetchMarketData();

    // Refresh data periodically
    const newsInterval = setInterval(fetchNews, 30000); // Every 30 seconds
    const marketInterval = setInterval(fetchMarketData, 15000); // Every 15 seconds

    return () => {
      clearInterval(newsInterval);
      clearInterval(marketInterval);
    };
  }, [fetchNews, fetchMarketData]);

  // Rotate displayed content
  useEffect(() => {
    if (news.length === 0 || marketData.length === 0) return;

    const newsRotation = setInterval(() => {
      setCurrentNewsIndex(prev => (prev + 1) % news.length);
    }, 30000);

    const marketRotation = setInterval(() => {
      setCurrentMarketIndex(prev => (prev + 1) % marketData.length);
    }, 15000);

    return () => {
      clearInterval(newsRotation);
      clearInterval(marketRotation);
    };
  }, [news.length, marketData.length]);

  const CardContent = ({ type }: CardContentProps) => {
    const isNews = type === 'news';
    const isLoading = isNews ? isNewsLoading : isMarketLoading;

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      );
    }

    if (isNews && news.length > 0) {
      const currentNews = news[currentNewsIndex];
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full flex flex-col"
        >
          <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 line-clamp-2">
            {currentNews.title}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-3 flex-grow line-clamp-3">
            {currentNews.description}
          </p>
          <a 
            href={currentNews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline mt-auto inline-flex items-center gap-1"
          >
            Read full article 
            <span className="text-lg">→</span>
          </a>
        </motion.div>
      );
    }

    if (!isNews && marketData.length > 0) {
      const currentStock = marketData[currentMarketIndex];
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full flex flex-col"
        >
          <div className="space-y-4 flex-grow">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {currentStock.symbol}
              </span>
              <div className="flex items-center">
                <span className={`font-medium ${
                  currentStock.trend === 'up' 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {currentStock.changePercent}%
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  ${currentStock.price}
                </span>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded">
              <motion.div
                className={`h-full rounded ${
                  currentStock.trend === 'up'
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}
                initial={{ width: '0%' }}
                animate={{ 
                  width: `${Math.min(Math.abs(parseFloat(currentStock.changePercent)), 100)}%` 
                }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
          <a 
            href={`https://www.google.com/finance/quote/${currentStock.symbol}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline block mt-4 inline-flex items-center gap-1"
          >
            View details 
            <span className="text-lg">→</span>
          </a>
        </motion.div>
      );
    }

    return null;
  };

  return (
    <section className="w-full py-6 px-4 sm:px-6 lg:px-8" id="info">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {/* News Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden
                       transition-colors duration-300 h-full flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative p-6 flex-grow flex flex-col">
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-blue-500"
                animate={{
                  width: ["0%", "100%"],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="flex items-center mb-4">
                <Newspaper className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Tech News
                </h3>
              </div>
              <div className="flex-grow">
                <CardContent type="news" />
              </div>
            </div>
          </motion.div>

          {/* Market Data Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden
                       transition-colors duration-300 h-full flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative p-6 flex-grow flex flex-col">
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-green-500"
                animate={{
                  width: ["0%", "100%"],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Market Trends
                </h3>
              </div>
              <div className="flex-grow">
                <CardContent type="market" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfoBanner;