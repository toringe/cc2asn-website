---
title: 'About'
menu:
  main:
    name: "About"
---
CC2ASN is a simple lookup service for AS-numbers and prefixes belonging to any 
given country in the world. Note that this is not a geolocation service, where 
you lookup IPs to get geo-data back. Using CC2ASN you lookup a country and get 
all associated ASNs and prefixes _(both v4 and v6)_ back.


### 📘 Terminology

**ASN** - an autonomous system _(AS)_ is a collection of connected IP routing 
prefixes under mutual administration, usually by a single organization or 
entity. In most cases the AS-number refers to either an ISP _(Internet Service 
Provider)_ or a corporation/organization. The AS-number is an integer of either 
16-bit or 32-bit, and can be written as either a simple numeric form _(asplain)_
or in a dotted format _(asdot)_. As with IP allocations, AS assigments also have
reservations with a certain special meaning. [Read more](https://en.wikipedia.org/wiki/Autonomous_System_(Internet)) 

**Prefix** - Subdivision of an internet protocol _(IP)_ network, where the 
routing prefix is expressed in CIDR-notation, where it is written as the first 
address of a network, followed by a slash character _(/)_, and ending with the 
bit-length of the prefix _(e.g. 192.168.0.1/24)_. As in IPv4, subnetting in IPv6
is based on the concepts of variable-length subnet masking _(VLSM)_ and the 
Classless Inter-Domain Routing _(CIDR)_ methodology. [Read more](https://en.wikipedia.org/wiki/Subnetwork) 

**CC** - a country code _(CC)_ is a unique numeric representation for a given 
country. This services uses the ISO 3166-1 Alpha-2 standard codes, which uses a
two-letter code as defined by the International Organization for Standardization
_(ISO)_ to represent countries, dependent territories, and special areas of 
geographical interest. Examples are; _NO_ for Norway, _SJ_ for Svalbard and Jan
Mayen (even though they are Norwegian territories) and _PS_ for Palestine. [Read
more](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)

### 📦 Data 

All the data is based on publicly available information from the five RIRs 
_(Regional Internet Registry)_ in the world; ARIN, RIPE NCC, APNIC, LACNIC and 
AFRINIC. Each RIR publish a delegation file using the Statistics Exchange Format
_(SEF)_. The delegation files are updated once every day. CC2ASN parses these 
files and restructure the data, based on country code. The data is then made 
available through an API and a legacy whois-server.

The details of the SEF definition are to be considered a published RIR standard,
on which other parties are expected to rely. RIRs must comply with this standard
in every respect.

The RIRs state that even though this data indicates the country where resources
were first allocated or assigned, it was never intended that the data be 
considered as an authoritative statement of the location where any specific 
resource may currently be in use.

### 🔧 Utility

So, what exactly can this all be used for? Well there are multiple applications
for these data, and I do not claim to know them all. One of the reasons I 
created the CC2ASN service, was a need to classify and filter network flows for
a given country based on AS-numbers alone, as part of doing netflow analysis 
work. And it was easier to process smaller sets of AS-numbers, rather than big
IP sets. In addition the network flows contained and was indexed on ASNs among 
other things.

### ⚠️ Service Disclaimer

The information contained in the CC2ASN service is for general information 
purposes only. We assumes no responsibility for errors or omissions in the 
contents of the service. In no event shall CC2ASN be liable for any special, 
direct, indirect, consequential, or incidental damages or any damages 
whatsoever, whether in an action of contract, negligence or other tort, arising 
out of or in connection with the use of the service or the contents of the 
service. CC2ASN reserves the right to make additions, deletions, or 
modifications to the contents on the service at any time without prior notice.

The information given by CC2ASN is for general guidance on matters of interest 
only. Even if we takes every precaution to insure that the content of the 
service is both current and accurate, errors can occur. Plus, given the changing
nature of laws, rules and regulations, there may be delays, omissions or 
inaccuracies in the information contained. CC2ASN is not responsible for any 
errors or omissions, or for the results obtained from the use of this 
information. In no event shall CC2ASN or its suppliers be liable for any 
special, incidental, indirect, or consequential damages whatsoever arising out 
of or in connection with your access or use or inability to access or use the 
service.

All information in CC2ASN is provided "as is", with no guarantee of 
completeness, accuracy, timeliness or of the results obtained from the use of 
this information, and without warranty of any kind, express or implied, 
including, but not limited to warranties of performance, merchantability and 
fitness for a particular purpose. CC2ASN will not be liable to you or anyone 
else for any decision made or action taken in reliance on the information given 
by the service or for any consequential, special or similar damages, even if 
advised of the possibility of such damages.
