---
title: JobSearchPromptCity_02
timestamp: 2016-11-22T22:42:21.154877051Z
---

Hi
* greeting

< Hi, what type of job are you looking for?
* prompt/specify_jobtype

I am looking for [engineering](jobrole) jobs.
* information_request/available_jobs

< Tell me which city you live in and I will try and find [engineering](jobrole) jobs near you?
* prompt/specify_city

I live in [London](city)
* response/specify_city

< I have [4](jobcount) [engineering](jobrole) jobs in [London](city). check [this](jobboardlink)
* information_response/available_jobs

Bye
* goodbye

< Bye for now.
* thanks
