
export let apiBaseUrl = '';
export let baseUrl = '';
export const parseApiBaseUrl = "https://recipe-parser.azurewebsites.net/api/parse?url="
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    apiBaseUrl = 'http://localhost:3003/api'
    baseUrl = 'http://localhost:3001';
} else {
    apiBaseUrl = 'https://some-recipes.azurewebsites.net/api';
    baseUrl = 'https://some-recipes.azurewebsites.net';
}

export const supportedUrls = [
    "101cookbooks.com",
    "allrecipes.com",
    "archanaskitchen.com",
    "bbc.com",
    "bbc.co.uk",
    "bbcgoodfood.com",
    "bettycrocker.com",
    "bonappetit.com",
    "budgetbytes.com",
    "closetcooking.com",
    "cookieandkate.com",
    "cooking.nytimes.com",
    "cookpad.com",
    "cookstr.com",
    "copykat.com",
    "countryliving.com",
    "cybercook.com.br",
    "en.wikibooks.org",
    "delish.com",
    "epicurious.com",
    "finedininglovers.com",
    "fitmencook.com",
    "food.com",
    "foodnetwork.com",
    "foodrepublic.com",
    "geniuskitchen.com",
    "greatbritishchefs.com",
    "giallozafferano.it",
    "gonnawantseconds.com",
    "gousto.co.uk",
    "healthyeating.nhlbi.nih.gov",
    "heinzbrasil.com.br",
    "hellofresh.com",
    "hellofresh.co.uk",
    "receitas.ig.com.br",
    "inspiralized.com",
    "jamieoliver.com",
    "justbento.com",
    "kennymcgovern.com",
    "thekitchn.com",
    "marmiton.org",
    "matprat.no",
    "mindmegette.hu",
    "misya.info",
    "momswithcrockpots.com",
    "motherthyme.com",
    "mybakingaddiction.com",
    "myrecipes.com",
    "ohsheglows.com",
    "www.panelinha.com.br",
    "paninihappy.com",
    "przepisy.pl",
    "realsimple.com",
    "simplyquinoa.com",
    "seriouseats.com",
    "simplyrecipes.com",
    "southernliving.com",
    "steamykitchen.com",
    "tastesoflizzyt.com",
    "tastykitchen.com",
    "thepioneerwoman.com",
    "thespruceeats.com",
    "thehappyfoodie.co.uk",
    "thevintagemixer.com",
    "tine.no",
    "tudogostoso.com.br",
    "twopeasandtheirpod.com",
    "vegolosi.it",
    "whatsgabycooking.com",
    "yummly.com"
]
