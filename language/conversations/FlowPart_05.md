---
title: FlowPart_05
timestamp: 2016-11-23T11:54:40.572292327Z
---

hi
* greeting

< Hi there. I can help you find a job. What type of role are you looking for?
* prompt/specify_jobtype

[engineering](jobrole) roles
* information_request/available_jobs

< OK no problem. First let me ask what city you are based in?
* prompt/specify_city

[Liverpool](city)
* response/specify_city

< I have [4](jobcount) [engineering](jobrole) jobs in [Liverpool](city). Visit [http://google.co.uk](jobboardlink) for more information.
* information_response/available_jobs

Bye
* goodbye

< Bye for now.
* thanks

