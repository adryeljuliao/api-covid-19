# Api Covid19

## Sobre

Esta API gera informações sobre casos do coronavirus (COVID-19) em várias partes do mundo 


## São dados confiavéis?

A fonte de dados é fornecida por diversos sites de notícias específicos de cada país onde são atualizados em tempo real. 
O provedor desse conjunto de dados pode ser encontrado em: https://www.worldometers.info/coronavirus/

## Como se conectar

### Buscar todos os países


```
// GET

https://statistic-covid19.herokuapp.com/countries
```

#### Resposta de sucesso (cod 200)
```
[
    {
    "country_other": "China",
    "total_cases": "81,054",
    "new_cases": "46",
    "total_deaths": "3,261",
    "new_deaths": "6",
    "total_recovered": "72,440",
    "active_cases": "5,353",
    "serious_critical": "1,845",
    "cases_to_1m_population": "56",
    "datetime_update": "2020-03-22T21:03:42.394Z"
    },

    {
    "country_other": "Italy",
    "total_cases": "59,138",
    "new_cases": "5,560",
    "total_deaths": "5,476",
    "new_deaths": "651",
    "total_recovered": "7,024",
    "active_cases": "46,638",
    "serious_critical": "3,000",
    "cases_to_1m_population": "978",
    "datetime_update": "2020-03-22T21:03:42.395Z"
    },

...
]
```
### Buscar um país
```
// GET

https://statistic-covid19.herokuapp.com/countries/brazil
```

#### Resposta de sucesso (cod 200)
```
{
  "country_other": "Brazil",
  "total_cases": "1,546",
  "new_cases": "368",
  "total_deaths": "25",
  "new_deaths": "7",
  "total_recovered": "2",
  "active_cases": "1,519",
  "serious_critical": "18",
  "cases_to_1m_population": "7",
  "datetime_update": "2020-03-22T21:03:42.402Z"
}
```
## License 

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.
