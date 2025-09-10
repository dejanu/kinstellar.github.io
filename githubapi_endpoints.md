* [users](https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-users) - to get users by location
* Test map using raw endpoint. i.e. aarhus: `https://api.github.com/search/users?q=location:aarhus`

- Create heatmap (with leaflet.heat) and center it in Bucharest
- Add marker for each city
- EU countries list:
```bash
['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Switzerland', 'Slovakia', 'Spain', 'Sweden']
```


### Elements of interest

* DESIGN SYSTEM: TEAL-BASED HARMONIZED PALETTE
* Leaflet library to visualize GitHub user data and city heatmaps on an interactive map
* Map is now initialized only once, and all markers, heatmap layers, and GitHub user counts are added to this single map instance
