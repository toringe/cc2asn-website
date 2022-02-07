---
title: "Whois"
date: 2022-02-06T23:16:09+01:00
menu:
  main:
    name: "Whois"
---

The CC2ASN data is accessible through a good old fashioned whois-server. This 
was originally inspired by other services like Team Cymru's IP-to-ASN mapping. 
Although initially a good idea, soon we'll convert to a HTTP-based API that 
provides simpler programatic intergrations. The whois-server will eventually be
retired when the usage is low enough. 

> `whois -h cc2asn.com [{asn}|ipv4|ipv6|all] <cc>`

### 🔍 Query Examples

Here are some examples querying the service using the Whois client.

Get all ASNs for Finland 
```bash
> whois -h cc2asn.com 'fi'
```

Get all IPv6 prefixes for Kenya:
```bash
> whois -h cc2asn.com 'ipv6 ke'
```

Get all records for Costa Rica:
```bash
> whois -h cc2asn.com 'all cr'
```

You can of course also just open a generic socket to the server and input the 
query. In the example below I use netcat. Actually using netcat is the preferred 
way as the whois client may not properly read all the data sent over the socket. 
The whois client was not designed to receive large data sets. This is usually 
the case if you get the error `fgets: connection reset by peer`.

Get ASNs for China using netcat:
```bash
> echo cn | nc cc2asn.com 43
```

Get IPv4 prefixes for Denmark using netcat:
```bash
> echo ipv4 dk | cc2asn.com 43
```


