interface HashProps {
    name: string;

  }
  
  export default function MealHashtag({ name }: HashProps) {
    
    function generateHashtag(name: string) {

      const keywords = `${name}`.split(/\s+/);
      const stopWords = ["and", "the", "is"];
      const filteredKeywords = keywords.filter(
        (word) => !stopWords.includes(word.toLowerCase())
      );
      const hashtag = filteredKeywords.join("");
      const formattedHashtag = `#${hashtag.toLowerCase()}`;
  
      return formattedHashtag;
    }

    const hashtag = generateHashtag(name);
  
    return (
      <div className="absolute bottom-2 left-4 text-slate-400">
        {hashtag}
      </div>
    );
  }
  