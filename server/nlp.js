import Sentiment from 'vader-sentiment';
import natural from 'natural';
// const Sentiment = require('vader-sentiment');
// const natural = require('natural');

// Analyze sentiment using vaderSentiment
function analyzeSentiment(text) {
//   const analyzer = new Sentiment();
  const result = Sentiment.SentimentIntensityAnalyzer.polarity_scores(text);
//   console.log("res",result)
  return result.compound;
}

function deriveWords(text) {
//     const tokens = text.match(/\b\w+('\w+)?\b/g);
//   return tokens || [];
    return new natural.WordTokenizer().tokenize(text);

  }
  
 
  function filterWordsBySentiment(words) {
    const sentimentWords = {
      positive: [],
      negative: [],
    };
  
    words.forEach((word) => {
      const wordSentiment = analyzeSentiment(word);
      if (wordSentiment > 0.2) {
        sentimentWords.positive.push(word);
      } else if (wordSentiment < -0.2) {
        sentimentWords.negative.push(word);
      }
    });
  
    return sentimentWords;
  }
  
  
//   const userReview = "Quit charging";
  
  
//   const words = deriveWords(userReview);
  
//   // Filter words based on sentiment
//   const sentimentWords = filterWordsBySentiment(words);
  
//   console.log('All Words:', words);
//   console.log('Positive Words:', sentimentWords.positive);
//   console.log('Negative Words:', sentimentWords.negative);


  

export const sentimentProcessor = (wordList)=>{
    const sWords = {
        positiveWords: [[]],
        negativeWords: [[]],
      };
    wordList.forEach((ls)=>{
        // console.log(ls.reviewTitle)
        const words = deriveWords(ls.reviewTitle);
        
        const sentimentWords = filterWordsBySentiment(words); 
        // console.log('All Words:', words);
        // console.log('Positive Words:', sentimentWords.positive);
        // console.log('Negative Words:', sentimentWords.negative);
        sWords.positiveWords = sWords.positiveWords.concat([sentimentWords.positive])
        sWords.negativeWords = sWords.negativeWords.concat([sentimentWords.negative])
    })
    console.log(sWords.positiveWords)
   return sWords;

}