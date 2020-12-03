
// Example Object: 
// "giftID":1,
// "date":"30/11/2020",
// "donor":"Dan Armstrong",
// "recipient":"Jon Parton", 
// "value":120,
// "currency":"£",
// "description":"Gave a wonderfull gift becuase he loves JPs beard."

// Created from our gifts.json file using https://app.quicktype.io/
export interface Gift {
    giftID:      number;
    date:        String;
    donor:       string;
    recipient:   string;
    value:       number;
    currency:    string;
    description: string;
}

export const initGift = (): Gift => ({
    giftID: 0,
    date: new Date().toISOString().split('T')[0],
    donor: "",
    recipient: "",
    value: 0,
    currency: "GBP",
    description: "",
  })

