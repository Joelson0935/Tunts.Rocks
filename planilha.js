const axios = require('axios')

/**
 * this function takes all datas from the google sheet and does all the operations required 
 * in this challenge across the conditionals values inside the function below
 */
function searchAndUpdate() {
    url = 'https://sheetdb.io/api/v1/zk9zu2ugsyr9d'
    axios.get(url).then(response => {
        const datas = response.data
        datas.map(function (data) {
            p1 = parseInt(data.P1)
            p2 = parseInt(data.P2)
            p3 = parseInt(data.P3)
            average = (p1 + p2 + p3) / 3
            if (average < 50) {
                data.Situação = 'Reprovado por Nota'
                axios.patch(url + '/Aluno/' + data.Aluno, {
                    "data": {
                        "Situação": data.Situação
                    }
                })
            }
            if (average >= 50 && average < 70) {
                data.Situação = 'Exame Final'
                axios.patch(url + '/Aluno/' + data.Aluno, {
                    "data": {
                        "Situação": data.Situação
                    }
                })
            }
            if (data.Situação === 'Exame Final') {
                score = (average + 70.1) / 2
                data.Nota_Para_Aprovação_Final = Math.ceil(score)
                axios.patch(url + '/Aluno/' + data.Aluno, {
                    "data": {
                        "Nota_Para_Aprovação_Final": data.Nota_Para_Aprovação_Final
                    }
                })
            }
            if (average > 70) {
                data.Situação = 'Aprovado'
                axios.patch(url + '/Aluno/' + data.Aluno, {
                    "data": {
                        "Situação": data.Situação
                    }
                })
            }

            if (60 / 4 < data.Faltas) {
                data.Situação = 'Reprovado Por Falta'
                axios.patch(url + '/Aluno/' + data.Aluno, {
                    "data": {
                        "Situação": data.Situação
                    }
                })
            }
            if (data.Situação != 'Exame Final') {
                data.Nota_Para_Aprovação_Final = 0
                axios.patch(url + '/Aluno/' + data.Aluno, {
                    "data": {
                        "Nota_Para_Aprovação_Final": data.Nota_Para_Aprovação_Final
                    }
                })
            }
            console.log(data);
            return data
        })


    })


}

searchAndUpdate();
