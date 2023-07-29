function checkPlagiarism() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    if (!file) {
      alert('Please select a file to check for plagiarism.');
      return;
    }
  
    const reader = new FileReader();
  
    // Handle errors while reading the file
    reader.onerror = function () {
      alert('Error occurred while reading the file.');
    };
  
    reader.onload = function (event) {
      const content = event.target.result;
  
      if (!content) {
        alert('Empty file. Please upload a valid file.');
        return;
      }
  
      const text = content.trim().toLowerCase(); // Convert text to lowercase for case-insensitive comparison
  
      const sampleText = "the quick brown fox jumps over the lazy dog";
      const plagiarismThreshold = 0.5; // Set a threshold for plagiarism detection
  
      const similarity = compareTexts(text, sampleText);
  
      const resultsSection = document.getElementById('resultsSection');
      resultsSection.innerHTML = `
        <h2>Plagiarism Results</h2>
        <p>Similarity Percentage: ${similarity.toFixed(2) * 100}%</p>
      `;
  
      if (similarity >= plagiarismThreshold) {
        resultsSection.innerHTML += "<p>This content may contain plagiarized text.</p>";
      } else {
        resultsSection.innerHTML += "<p>No evidence of plagiarism found.</p>";
      }
  
      resultsSection.style.display = 'block';
    };
  
    // Handle errors while reading the file
    reader.onerror = function () {
      alert('Error occurred while reading the file.');
    };
  
    reader.readAsText(file);
  }
  
  // Function to compare two texts and calculate similarity
  function compareTexts(text1, text2) {
    const words1 = text1.split(/\s+/);
    const words2 = text2.split(/\s+/);
  
    const commonWords = words1.filter((word) => words2.includes(word));
    const similarity = commonWords.length / Math.max(words1.length, words2.length);
  
    return similarity;
  }
  