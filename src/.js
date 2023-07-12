// curl --location --request POST 'http://localhost:8000/v1/risk-assessment-report' \
// --header 'sec-ch-ua: "Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"' \
// --header 'sec-ch-ua-mobile: ?0' \
// --header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTMxMTEwMzksImlhdCI6MTY4MTU3NTAzOSwic3ViIjoiNjMwY2JkYTQ4MzgzNzIxZjFlNmRjZGZiIiwibW9iIjo5MTkwOTgwMDg4OTB9.Sb0SgVjynXVhjSFbwrKaLwAvxlH3xKiHWq2Ya8cNoxM' \
// --header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36' \
// --header 'Content-Type: application/json' \
// --header 'Accept: application/json, text/plain, /' \
// --header 'Referer: http://localhost:3000/' \
// --header 'sec-ch-ua-platform: "macOS"' \
// --data-raw '{
//     "name": "test11",
//     "siteId": "6364c763dab738df842f2cbb",
//     "riskAssessmentCategoryId": "643ad3cad0dc3b2396db360c",
//     "questions": [
//         {
//             "questionId": "643ad611f1997724e10542e4",
//             "choiceId": [
//                 {
//                     "choice": "640881950cad11228cffcbb9",
//                     "optionId": "640af1334cd9a6340cab232f"
//                 }
//             ]
//         }
//     ]
// }'