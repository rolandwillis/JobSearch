---
title: Flow_01
timestamp: 2016-11-23T11:43:31.970490968Z
---

hi
* greeting

< Hi, what type of job are you looking for?
* prompt/specify_jobtype

i am looking for a [developer](jobrole) job
* information_request/available_jobs

< OK. Where do you live?
* prompt/specify_city

London
* response/specify_city

< Great. I have [9](jobcount) [developer](jobrole) jobs in [London](city). Visit [[http://google.com]](jobboardlink) for more information.
* information_response/available_jobs

Thanks
* thanks

< No problem
* thanks

bye
* goodbye

< Nice talking with you. Come back soon.
* finish/goodbye
