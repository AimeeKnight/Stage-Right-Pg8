(function(){

  "use strict";

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $("#submit").click(buildUrl);
    $("input, select").change(calculateVoiceWorkshopTotal);
  }

  function getNames(){
    var names = [];
    var $names = $("input[name=names]");
    $names.each(function(index, name){
      name = $(name).val();
      if (name){
        names.push(name);
      }
    });
    names.join();
    return names;
  }

  function calculateVoiceWorkshopTotal(){
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
    var names = getNames();
    var url = "https://rcsf.trail-staging.us/widget?campaign_id=2834&schedule=0&success_url=http%3A//www.rochesterchristianschool.org/&cart[desc]=Camp"

    var $assistance = $("#assistance").is(":checked")

    var $paymentOption = $("#payment_option").find(":selected").val();

    var workshopTotal = calculateVoiceWorkshopTotal();
    var $workshopQty = $("select#voice-option-qty > option:selected").text() *1;
    var $workshopId = $("select#voice-option > option:selected").attr('value');
    var $workshopDescription = $("select#voice-option > option:selected").text();
    var $emergencyNumber = $("input[name=phone]").val();

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

    if (names.length !== 0) {
      items ++;
      url += "&cart[items]["+items+"][notes]="+names;
    }

    if ($assistance) {
      items ++;
      url += "&cart[items]["+items+"][amount]=0";
      url += "&cart[items]["+items+"][desc]=Assistance";
      url += "&cart[items]["+items+"][product_id]=payment_assistance";
      url += "&cart[items]["+items+"][quantity]=0";
    };
    
    if ($emergencyNumber) {
      items ++;
      url += "&cart[items]["+items+"][desc]="+$emergencyNumber;
      url += "&cart[items]["+items+"][product_id]=emergency_number";
    }

    //window.location.href = url;
    alert(url);
  }

})();
