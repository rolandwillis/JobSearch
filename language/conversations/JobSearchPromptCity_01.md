---
title: JobSearchPromptCity_01
timestamp: 2016-11-22T20:26:06.277712545Z
---

are there any [engineering](jobrole) jobs?
* information_request/available_jobs

< Tell me which city you live in and I will try and find [engineering](jobrole) jobs near you?
* prompt/specify_city

I live in [london](city)
* response/specify_city

< Ok, I had a look and I have found [4](jobcount) [engineering](jobrole) jobs in and around [london](city). Click [here](jobboardlink) to have a look.
* information_response/available_jobs

Thanks, that's great.
* thanks

< No problem :) Is there anything else I can help you with?
* prompt/need_help

No
* decline/thanks

< OK. Goodbye.
* thanks
