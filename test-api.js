const apiKey = 'AIzaSyCzJpoYpqUkjJm_SxyFfPuafwXrLPI34tk';
const query = 'Harry Potter';
const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&orderBy=newest&filter=free-ebooks&printType=books&maxResults=3&key=${apiKey}`;

console.log('Testing Google Books API with filters:');
console.log('Query:', query);
console.log('Filters: orderBy=newest, filter=free-ebooks, printType=books');
console.log('URL:', url);
console.log('\nFetching results...\n');

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log('Total results found:', data.totalItems || 0);
    
    if (data.items && data.items.length > 0) {
      console.log('\nFirst few results:');
      data.items.forEach((book, i) => {
        const info = book.volumeInfo;
        const saleInfo = book.saleInfo;
        console.log(`${i + 1}. "${info.title}"`);
        console.log(`   Authors: ${info.authors?.join(', ') || 'Unknown'}`);
        console.log(`   Published: ${info.publishedDate || 'No date'}`);
        console.log(`   Type: ${info.printType || 'Unknown'}`);
        console.log(`   Sale: ${saleInfo?.saleability || 'Unknown'}`);
        console.log('');
      });
    } else {
      console.log('No results found. This might be because:');
      console.log('- There are no free Harry Potter eBooks available');
      console.log('- The combination of filters is too restrictive');
      console.log('\nTrying with less restrictive filters...');
      
      // Try with just orderBy=newest
      const lessRestrictiveUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&orderBy=newest&maxResults=3&key=${apiKey}`;
      return fetch(lessRestrictiveUrl);
    }
  })
  .then(res => {
    if (res) {
      return res.json();
    }
  })
  .then(data => {
    if (data) {
      console.log('Results with less restrictive filters (newest only):');
      console.log('Total results:', data.totalItems || 0);
      
      if (data.items) {
        data.items.slice(0, 3).forEach((book, i) => {
          const info = book.volumeInfo;
          console.log(`${i + 1}. "${info.title}" (${info.publishedDate || 'No date'})`);
        });
      }
    }
  })
  .catch(err => {
    console.error('Error testing API:', err.message);
  });
