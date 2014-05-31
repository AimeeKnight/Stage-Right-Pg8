(function(){

  "use strict";
  var items = 0;

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $("#submit").click(buildUrl);
    $("input, select").change(splitPayments)
  }

  function getNumberofKids(){
    var $qty = $("select#child-qty > option:selected").text();
    var qty = $qty * 1;
    return qty;
  }

  function calculateVoiceDiscount(){
    var qty = getNumberofKids();
    var total = 0;
    var $voiceOption = $("select#voice-option > option:selected").text();
    if (qty >= 2 && $voiceOption !== ""){
      total = 100;
      var discount = total * .10;
      total -= discount;
    } else if (qty == 1 && $voiceOption !== ""){
      total += 100
    } else {
      total = 0
    }
    return total;
  }

  function calculateHomeSchoolDiscount(){
    var qty = getNumberofKids();
    var total = 0;
    var $homeSchool = $("input[name=home_school]").is(":checked")
    var $kidCount = $("select#child-qty > option:selected").text();
    if (qty >= 2 && $kidCount !== "" && $homeSchool){
      total = 100;
    } else if (qty === 1 && $homeSchool) {
      total = 130;
    } else {
      total = 0;
    }
    return total;
  }

  function splitPayments(){
    var $paymentOption = $("#payment-option").find(":selected").val();
    var payment = calculateTotal();
    if ($paymentOption === "pay_deposit"){
      payment = Math.ceil(payment / 3);
    }
    $("#total").text(payment);
    return payment;
  }

  function calculateTotal(){
    var total = 0;
    var homeSchoolTotal = calculateHomeSchoolDiscount();
    var voiceTotal = calculateVoiceDiscount();
    total += homeSchoolTotal;
    total += voiceTotal;
    return total;
  }

  function addNotes(url){
    var $name = $("input[name=name]").val();
    var $emergencyNumber = $("input[name=phone]").val();
    if ($name) {
      items ++;
      url += "&cart[items]["+items+"][notes]="+$name;
    }
    if ($emergencyNumber) {
      items ++;
      url += "&cart[items]["+items+"][notes]="+$emergencyNumber;
    }
    return url
  }

  function buildUrl(){
    var url = "https://stageright.trail-staging.us/?campaign_id=2904&schedule=1&max_times_donate=3";
    url = addNotes(url);
    var $assistance = $("#assistance").is(":checked")
    var $paymentOption = $("#payment_option").find(":selected").val();
    var homeSchoolTotal = calculateHomeSchoolDiscount();
    var voiceTotal = calculateVoiceDiscount();
    var $workshopQty = $("select#voice-option-qty > option:selected").text() *1;
    var $workshopId = $("select#voice-option > option:selected").attr('value');
    var $workshopDescription = $("select#voice-option > option:selected").text();

    if (homeSchoolTotal > 0) {
      items ++;
      url += "&cart[items]["+items+"][desc]=Home School";
      url += "&cart[items]["+items+"][amount]="+homeSchoolTotal;
      url += "&cart[items]["+items+"][product_id]=home_school";
      url += "&cart[items]["+items+"][quantity]=1";
    }

    if (voiceTotal > 0) {
      items ++;
      url += "&cart[items]["+items+"][desc]="+$workshopDescription;
      url += "&cart[items]["+items+"][amount]="+voiceTotal;
      url += "&cart[items]["+items+"][product_id]="+$workshopId;
      url += "&cart[items]["+items+"][quantity]=1";
    }

    if ($paymentOption === "pay_deposit") {
      items ++;
      url += "&cart[items]["+items+"][desc]=Child Deposit";
      url += "&cart[items]["+items+"][product_id]=pay_deposit";
    } else {
      items ++;
      url += "&cart[items]["+items+"][desc]=Child Payment";
      url += "&cart[items]["+items+"][product_id]=pay_in_full";
    }

    if ($assistance) {
      items ++;
      url += "&cart[items]["+items+"][amount]=0";
      url += "&cart[items]["+items+"][desc]=Assistance";
      url += "&cart[items]["+items+"][product_id]=payment_assistance";
      url += "&cart[items]["+items+"][quantity]=1";
    };

    if ($('#total').text() > 0){
      alert(url);
      //window.location.href = url;
    }
  }

})();
