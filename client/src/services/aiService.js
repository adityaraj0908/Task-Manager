

export const suggestTitle = async (description) => {
  
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!description || description.length < 5) {
        resolve("New Task");
        return;
      }

     
      const words = description.split(' ');
      
      
      const keywords = words.slice(0, 4).join(' ');
      
      const titles = [
        `Review: ${keywords}...`,
        `Fix: ${keywords}`,
        `Implement ${keywords}`,
        `Urgent: ${keywords}`
      ];

      
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      resolve(randomTitle);
    }, 1500);
  });
};