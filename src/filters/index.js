import Vue from 'vue'

Vue.filter('reverseLabel', function(value) {
  var labeltype = {
    Information: "label-info",
    Warning: "label-warning",
    Average: "label-average",
    High: "label-high",
    Disaster: "label-danger",
    "Not classified": "label-default"
  }
  return labeltype[value];
});
Vue.filter('convertLandscape', function(value) {
  var labeltype = {
    cn: "1605 CN Landscape",
    us: "1605 US Landscape",
    eu: "1605 EU Landscape",
    monsoon_z2: "DevOps Infrastructure",
    msa_us: "MSA US Landscape",
  }
  return labeltype[value];
});

export default function() {
  console.log("import two vue filters");
}