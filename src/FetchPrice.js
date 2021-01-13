import axios from "axios";

const FetchPrice = (ticker) => {
  return axios
    .get("https://data.alpaca.markets/v1/last/stocks/" + ticker, {
      headers: {
        "APCA-API-KEY-ID": "PKPGDVLWWRB8TR64AJXM",
        "APCA-API-SECRET-KEY": "zpAlXSlqRuTUIRdsQVropFrSBqUDerwMh7VJv43J",
      },
    })
    .then((res) => {
      return res.data.last.price;
    });
};

export { FetchPrice };
