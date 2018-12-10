var axios = require("axios");
var _ = require("lodash");

var stars = [11767,
    85822,
    85822,
    82080,
    82080,
    77055,
    77055,
    79822,
    79822,
    75097,
    75097,
    72607,
    72607,
    77055]


stars = _.uniq(stars)

function getStar(starId) {
    return axios.get(`https://hipparcos-tools.cosmos.esa.int/cgi-bin/HIPcatalogueSearch.pl?hipId=${starId}`).then(function (starData) {
        console.log("-".repeat(50))
        var sss = starData.data
        var x = +sss.substring(sss.indexOf("H8"), sss.indexOf("H10")).trim().split("\n")[0].replace(/H8/, "").replace(" :", "").replace(/\s/gi, "").replace("alpha,degrees(J1991.25)", "")
        var y = +sss.substring(sss.indexOf("H9"), sss.indexOf("H10")).trim().split("\n")[0].replace(/H9/, "").replace(" :", "").replace(/\s/gi, "").replace("delta,degrees(J1991.25)", "")

        if (x > 180)    x -= 360

        console.log({
            starId: starId,
            x: x,
            y: y
        })
    })
}

stars.forEach((starId) => {
    getStar(starId)
})