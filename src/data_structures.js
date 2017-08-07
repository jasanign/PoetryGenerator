/**
 * Data Structures and Text Analysis
 * @author Gajjan Jasani
 * @version 10/4/2015
 */

/** Creating module object */
module.exports = {};
/** creating shorthand variable for this module */
var exports = module.exports;


/**
 * Purpose: Find each unique word in the text provided and
 * find out the number of time each of those unique words
 * appear in the given text
 * @param text the text string retrieved from the input text file
 * @return {{}} wordCount object with unique words as keys and
 * number of appearances as values
 */
var wordCount = function(text) {
    
    
    var data = readFile(text);
    if(checkEmptyFile(data) === 'empty'){
        
        return null;
    } else {

        var textArray = data.split(/\s+/); //Creating an array of words
                                         // from the given text
        var wordCount = {};
    
        for (var i = 0; i < textArray.length; i++) {
            var word = textArray[i];
            checkWord(word, wordCount);
        }
    
        return wordCount;
    }
};

/**
 * Purpose: Find out frequence of appearance of each unique word
 * in the given text
 * @param text the text string retrieved from the input text file
 * @return {{}} wordFreq object in word : frequency manner
 */
 var wordFreq = function(text) {
     

    var wordFreq = wordCount(text); //Finding the word count
                                    // using wordCount function
                                    
    var data = readFile(text);
    if(checkEmptyFile(data) === 'empty'){
        
        return null;
    } else {
    
        var textArray = data.split(/\s+/);
        const totalWords = textArray.length;
    
        for (var key2 in wordFreq) {
            wordFreq[key2] = (wordFreq[key2]) / totalWords;
        }
    
        return wordFreq;
    }
};

/**
 * Purpose: Find out the words following each appearance of a unique word
 * @param text text the text string retrieved from the input text file
 * @return {{}} condWordCount object in the following manner:
 *              {unique word : { following word : # of times}, ...}
 */
 var condWordCount= function(text) {
     
     
    var data = readFile(text);
    if(checkEmptyFile(data) === 'empty'){
        
        return null;
    } else {
        
        var textArray = data.split(/\s+/);
        var condWordCount = {};
        const wordsInText = textArray.length;
    
        for (var i = 0; i < wordsInText; i++) {
    
            var word = textArray[i];
    
            // Creating an object for each unique word
            if (!(word in condWordCount)) { 
                condWordCount[word] = {};
            }
    
            if (i + 1 < wordsInText) { // making sure the word is not
                                       // the last word in the text array
    
                checkWord(textArray[i + 1], condWordCount[word]);
            } else { // stating that textArray is circular
                     // and last word follows the first word in the text
                checkWord(textArray[0], condWordCount[word]);
            }
        }
        return condWordCount;
    }
};


/**
 * Purpose: Find out the frequency of each words following each appearance
 * of a unique word
 * @param text text the text string retrieved from the input text file
 * @return {{}} condWordFreq object in the following manner:
 *              {unique word : { following word : Frequency of times}, ...}
 */
 var condWordFreq = function(text) {

    var condWordFreq = condWordCount(text);

    for (var keyFunction in condWordFreq) {

        var counter = 0;

        for (var key in condWordFreq[keyFunction]) {
            counter = counter + (condWordFreq[keyFunction][key]);
        }

        for (var key2 in condWordFreq[keyFunction]) {
            condWordFreq[keyFunction][key2] = 
                    (condWordFreq[keyFunction][key2]) / counter;
        }
    }
    return condWordFreq;
};


//==================== Helper Functions ==================================

/**
 * Purpose: Find out if a given word is a property of a given object or not
 * if it is not then add the word as a new property of the given object and
 * if it is a property of the given object then increase its value by 1.
 * @param word word needing check with the given object
 * @param yourObj Object needing check of given word i its property or not
 */
function checkWord(word, yourObj) {
    if (!(word in yourObj)) {
        yourObj[word] = 1;
    } else {
        yourObj[word] = yourObj[word] + 1;
    }
}

/**
 * Purpose: read text from the given file using fs module and add the text
 * to the data variable
 * @param {FilePath} file path to the text file
 * @return  text read from the text file
 */
function readFile (file){
    
    var fs = require('fs');
    var data = fs.readFileSync(file, "utf8");
    
    return data;
    
}

/**
 * Purpose: To check if the given text has anything besides the whitespaces
 * @param {string} data text from the text file
 * @return  "empty" if the file has nothing but the whitespaces
 */
function checkEmptyFile(data){
    
    if(data.replace(/\s+/, '') === ''){
        
        return 'empty';
    }
}

/** adding the functions to the exports module */
exports.wordCount = wordCount;
exports.wordFreq = wordFreq;
exports.condWordCount = condWordCount;
exports.condWordFreq = condWordFreq;