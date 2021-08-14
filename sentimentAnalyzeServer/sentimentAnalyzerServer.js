const express = require('express');
const dotenv = require('dotenv');
const app = new express();
dotenv.config();


let api_key = process.env.API_KEY;
let api_url = process.env.API_URL;
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2021-08-14',
    authenticator: new IamAuthenticator({
        apikey: api_key,
    }),
    url: api_url,
});


app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

// app.get("/", (req, res) => {
//     res.render('index.html');
// });

app.get("/url/emotion", (req, res) => {
    const url = req.query.url;
    const analyzeParams = {
        'url': url,
        'features': {
            'keywords': {
                'emotion': true,
                'limit': 1
            }
        },
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log("url/emotion--> ", JSON.stringify(analysisResults, null, 2));
            return res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.get("/url/sentiment", (req, res) => {
    const url = req.query.url;

    const analyzeParams = {
        'url': url,
        'features': {
            'keywords': {
                'sentiment': true,
                'limit': 1
            }
        }
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log("url/sentiment--> ", JSON.stringify(analysisResults, null, 2));
            return res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.get("/text/emotion", (req, res) => {
    const text = req.query.text;
    const analyzeParams = {
        'text': text,
        'features': {
            'keywords': {
                'emotion': true,
                'limit': 1
            }
        },
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log("text/emotion--> ", JSON.stringify(analysisResults, null, 2));
            return res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.get("/text/sentiment", (req, res) => {

    const text = req.query.text;

    const analyzeParams = {
        'text': text,
        'features': {
            'keywords': {
                'sentiment': true,
                'limit': 1
            }
        }
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log("text/sentiment--> ", JSON.stringify(analysisResults, null, 2));
            return res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
