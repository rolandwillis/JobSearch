---
title: JobSearchPromptCity_05
timestamp: 2016-11-23T10:17:00.741299282Z
---

hi
* greeting

< Hi there. I can help you find a job. What type of role are you looking for?
* prompt/specify_jobtype

I am really looking for [c# senior development](jobrole) roles.
* information_request/available_jobs

< OK no problem. First let me ask what city you are based in?
* prompt/specify_city

I am based in [Liverpool](city)
* response/specify_city

< Thanks. I have found [8](jobcount) [c# senior development](jobrole) roles near [Liverpool](city). Click [here](jobboardlink) to have a look.
* information_response/available_jobs

Goodbye
* thanks
