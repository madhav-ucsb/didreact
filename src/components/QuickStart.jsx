import { Button } from "antd";
import React from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import "./styles.css";
//const { Text } = Typography;
var uri;
import VerifyButton from "@passbase/button/react";

export default function QuickStart({ isServerInfo }) {
  const { Moralis } = useMoralis();
  const a = isServerInfo;
  console.log("a", a);
  const axios = require("axios");
  const curr = useMoralis().account;
  console.log("account", curr);

  const contractProcessor = useWeb3ExecuteFunction();

  async function donation(val) {
    // const key = "6fcfe1da-1e4f-4c1a-b566-a69160886024"
    // console.log("passbase key", key);

    // console.log("account", curr);

    // const da = { acc: curr, keys: key };

    // const headers = { "Content-Type": "application/json" };

    // const json = JSON.stringify(da);

    // const k = "5572a633-dc3b-4388-a8cb-7a638c8a42a5"

    //axios.post("https://uia7nmstlv2zibmpkkynb6sk640ficqp.lambda-url.us-east-2.on.aws/", da).then((response) => console.log(response)).catch((error) => console.log(error));
    // uri = axios.post("https://us-central1-resonant-time-246620.cloudfunctions.net/function-1", da, headers);
    // console.log("uri", uri);
    // const k = "5572a633-dc3b-4388-a8cb-7a638c8a42a5";

    // const ad = "0xdf306DBD33f56360a522FF1Ffd258F8F2B009446";
    // const ada = { acc: ad, keys: k };
    // //axios.post("https://uia7nmstlv2zibmpkkynb6sk640ficqp.lambda-url.us-east-2.on.aws/", ada).then((response) => console.log(response)).catch((error) => console.log(error));
    // axios.post("https://tuvyyg4zao3fir4hw2owyxjqpe0kmrtj.lambda-url.us-east-2.on.aws/", ada).then((response) => console.log(response)).catch((error) => console.log(error));
    // console.log("finished axios request");

    // console.log("start donation function");
    let dataPromise = uri.then((response) => response.data);
    dataPromise.then(async function (result) {
      let temp_uri = result["uri"];
      let options = {
        contractAddress: "0x1a841e07833830cC450ed49dd15758f7e21bCa71",
        functionName: "mint",
        abi: [
          {
            inputs: [
              {
                internalType: "string",
                name: "_uri",
                type: "string",
              },
            ],
            name: "mint",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
        ],
        params: { _uri: temp_uri },
        msgValue: Moralis.Units.ETH(val),
      };
      console.log("before fetchin contract");
      await contractProcessor.fetch({
        params: options,
      });
      console.log("done");
    });
  }
  const referenceUserWithKey = (key) => {
    console.log("passbase key", key);

    console.log("account", curr);

    const da = { acc: curr, keys: key };

    const headers = { "Content-Type": "application/json" };

    //const k = "5572a633-dc3b-4388-a8cb-7a638c8a42a5";

    //axios.post("https://uia7nmstlv2zibmpkkynb6sk640ficqp.lambda-url.us-east-2.on.aws/", da).then((response) => console.log(response)).catch((error) => console.log(error));
    uri = axios.post(
      "https://us-central1-resonant-time-246620.cloudfunctions.net/function-1",
      da,
      headers,
    );

    console.log("uri", uri);

    // Make request to your backend/db and save the key to the user's profile
  };

  return (
    <div>
      <div className="container">
        <div className="vertical-center">
          {/* <Text>r</Text> */}
          <Button onClick={() => donation(0.02)}> Redeem nft</Button>
        </div>
      </div>
      <div className="App">
        <img
          className="img-fluid passbase"
          src="https://passbase.com/assets/images/logo.png"
          alt="Passbase"
        />

        <script></script>

        <div className="container">
          <p className="title">Keep tab open and don't refresh </p>
          <p className="subtitle">
            Click the verify me button below to start a new verification.
          </p>
          <p className="subtitle">
            Take pictures when you have good lighting and redo id image until
          </p>
          <p className="subtitle">
            you get clear pictures of BOTH sides. After finishing verification,
            wait for email and keep tab open before redeeming nft.
          </p>

          <VerifyButton
            apiKey={
              "N0suI190Mv6JEr1mBLQdNPzg0HXb3z6Rj0jDO2uxJpgwXNZE5bVG0zs4Zt39Lk6L"
            }
            onFinish={(identityAccessKey) => {
              referenceUserWithKey(identityAccessKey);
            }}
          />
        </div>
      </div>
    </div>
  );
}
