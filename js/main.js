(function(){

  "use strict";

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $("#submit").click(buildUrl);
    $("input, select").change(calculateVoiceWorkshopTotal);
  }

  function getNumberofKids(){
    var $qty = $("select#child-qty > option:selected").text();
    var qty = $qty * 1;
    console.log(qty);
    return qty;
  }

  function calculateVoiceWorkshopTotal(){
    getNumberofKids();
    var $total = 0;
    var $workshopDescription = $("select#voice-option > option:selected").text();
    var $qty = $("select#voice-option-qty > option:selected").text();
    if (($qty * 1) >= 2 && $workshopDescription !== ""){
      var total = $qty * 100;
      var discount = total * .10;
      total -= discount;
    } else if ($qty === "1") {
      total = 100;
    }else {
      total = 0
    }
    $("#total").text(total);
    return total;
  }

  function buildUrl(){
    var items = 0;
    var $name = $("input[name=name]").val();
    var $emergencyNumber = $("input[name=phone]").val();
    var url = "https://stageright.trail-staging.us/?campaign_id=2904&schedule=1&max_times_donate=3";

    var $assistance = $("#assistance").is(":checked")

    var $paymentOption = $("#payment_option").find(":selected").val();

    var workshopTotal = calculateVoiceWorkshopTotal();
    var $workshopQty = $("select#voice-option-qty > option:selected").text() *1;
    var $workshopId = $("select#voice-option > option:selected").attr('value');
    var $workshopDescription = $("select#voice-option > option:selected").text();

    if (workshopTotal > 0) {
      items ++;
      url += "&cart[items]["+items+"][desc]="+$workshopDescription;
      url += "&cart[items]["+items+"][amount]="+workshopTotal;
      url += "&cart[items]["+items+"][product_id]="+$workshopId;
      url += "&cart[items]["+items+"][quantity]="+$workshopQty;
    }

    if ($paymentOption === "pay_in_full") {
      items ++;
      url += "&cart[items]["+items+"][desc]=Child+Payment";
      url += "&cart[items]["+items+"][product_id]=pay_in_full";
    } else {
      items ++;
      url += "&cart[items]["+items+"][desc]=Child+Deposit";
      url += "&cart[items]["+items+"][product_id]=pay_deposit";
    };

    if (name) {
      items ++;
      url += "&cart[items]["+items+"][notes]="+name;
    }

    if ($assistance) {
      items ++;
      url += "&cart[items]["+items+"][amount]=0";
      url += "&cart[items]["+items+"][desc]=Assistance";
      url += "&cart[items]["+items+"][product_id]=payment_assistance";
      url += "&cart[items]["+items+"][quantity]=1";
    };

    if ($emergencyNumber) {
      items ++;
      url += "&cart[items]["+items+"][desc]="+$emergencyNumber;
      url += "&cart[items]["+items+"][product_id]=emergency_number";
    }

    //window.location.href = url;
    console.log(url);
  }

})();
