# Indonesian-minimum-wage-API

Indonesian minimum wage API, both level 1 and 2 (UMP and UMK)

This repository contains the source code to generate a static (REST) API containing data for Indonesian regions and commands to deploy it to static hosting Github Page.

What is meant by a static API?

A static API is an API whose endpoints consist of static files. Advantages of a static API?

Can be hosted on static file hosting services such as Github Page, Netlify, etc. Faster process because it does not require server-side scripting.


I want to host it on my own Github, how can I do that?

Click fork in the top right corner. On the forking page, UNCHECK “Copy the master branch only”. Click “Create Fork”. After forking is done, click Settings (not account settings, but repository settings). Click the “Pages” menu to enter the GitHub Pages settings menu. In the GitHub Pages settings menu: Choose Source: Deploy from a Branch Branch: gh-pages Directory: /root Click Save Wait a few minutes (5-10 minutes), go back to the repository’s home page (https://github.com/yourusername/Indonesian-minimum-wage-API). If the page has been deployed, on the right side of the page, you will see “Environments” information. If not, wait a few more minutes, then refresh. Once the Environments information appears, click on “🚀 github-pages”. On the Deployments page, click “View Deployment” to see the successfully deployed page.

## ENDPOINTS

#### 1. Get minimum wage(UMP) list of Provinces

```
GET https://imitasi11.github.io/Indonesian-minimum-wage-API/static/provinces.json
```

Example Response:

```
[
  {
    "id": 1,
    "province": "Aceh",
    "data": {
        "2018": 2700000,
        "2019": 2916810,
        "2020": 3165031,
        "2021": 3165031,
        "2022": 3166460,
        "2023": 3413666,
        "2024": 3460672,
        "2025": 3685616
    }
  },
  {
    "id": 2,
    "province": "Sumatera Utara",
    "data": {
        "2018": 2132188.68,
        "2019": 2303403.43,
        "2020": 2499423.06,
        "2021": 2499423.06,
        "2022": 2522609.94,
        "2023": 2710493.93,
        "2024": 2809915,
        "2025": 2992559
    }
  },
  ...
]
```

#### 2. Get minimum wage list of Districts/Cities(UMK) in a Certain Province

```
GET https://imitasi11.github.io/Indonesian-minimum-wage-API/static/regencies/{provinceId}.json
```

Example to get a minimum wage list of districts/cities in Aceh province (ID = 1)

```
GET https://imitasi11.github.io/Indonesian-minimum-wage-API/static/regencies/1.json
```

Example Response:

```
[
    {
        "id": 101,
        "name": "Banda Aceh",
        "province_id": 1,
        "province": "Aceh",
        "data": {
            "2024": 3540555,
            "2025": 3685616
        }
    },
    {
        "id": 102,
        "name": "Kabupaten Aceh Barat",
        "province_id": 1,
        "province": "Aceh",
        "data": {
            "2024": 3413666,
            "2025": 3685616
        }
    },
    {
        "id": 103,
        "name": "Kabupaten Aceh Barat Daya",
        "province_id": 1,
        "province": "Aceh",
        "data": {
            "2024": 3413666,
            "2025": 3685616
        }
    },
  ...
]
```

#### 3. Get minimum wage of Districts/City(UMK) based on Districts/City ID


```
GET https://imitasi11.github.io/Indonesian-minimum-wage-API/static/regency/{regencyId}.json
```

Example Response:

```
{
    "id": 101,
    "name": "Banda Aceh",
    "province_id": 1,
    "province": "Aceh",
    "data": {
        "2024": 3540555,
        "2025": 3685616
    }
}
```
