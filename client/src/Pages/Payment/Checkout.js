// import React, { useEffect } from "react";
// import Layout from "../../Layout/Layout";
// import { BiRupee } from "react-icons/bi";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getRazorPayId,
//   purchaseCourseBundle,
//   verifyUserPayment,
// } from "../../Redux/razorpaySlice";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const razorPayKey = useSelector((state) => state.razorpay.key);
//   const order_id  = useSelector(
//     (state) => state.razorpay.subscription_id
//   );
//   const userData = useSelector((state) => state.auth.data);
//   const { isPaymentVerified } = useSelector((state) => state.razorpay);

//   // for storing the payment details after successfull transaction
//   const paymentDetails = {
//     razorpay_payment_id: "",
//     razorpay_subscription_id: "",
//     razorpay_signature: "",
//   };

//   const handleSubscription = async (event) => {
//     event.preventDefault();

//     if (!razorPayKey || !order_id) {
//       toast.error("Payment setup failed");
//       return;
//     }

//   //   const options = {
//   //     key: razorPayKey,
//   //     subscription_id: subscription_id,
//   //     name: "Coursify Pvt. Ltd.",
//   //     description: "Monthly Subscription",
//   //     handler: async function (response) {
//   //       paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
//   //       paymentDetails.razorpay_subscription_id =
//   //         response.razorpay_subscription_id;
//   //       paymentDetails.razorpay_signature = response.razorpay_signature;

//   //       // displaying the success message
//   //       toast.success("Payment Successfull");

//   //       // verifying the payment
//   //       const res = await dispatch(verifyUserPayment(paymentDetails));

//   //       // redirecting the user according to the verification status
//   //       !isPaymentVerified
//   //         ? navigate("/checkout/success")
//   //         : navigate("/checkout/fail");
//   //     },
//   //     prefill: {
//   //       name: userData.fullName,
//   //       email: userData.email,
//   //     },
//   //     theme: {
//   //       color: "#F37254",
//   //     },
//   //   };
//   //   const paymentObject = new window.Razorpay(options);
//   //   paymentObject.open();
//   // };

//   const options = {
//     key: razorPayKey,
//     amount: 499 * 100,
//     currency: "INR",
//     order_id: order_id,
//     name: "Coursify Pvt. Ltd.",
//     description: "Course Purchase",
  
//     handler: async function (response) {
//       paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
//       paymentDetails.razorpay_order_id = response.razorpay_order_id;
//       paymentDetails.razorpay_signature = response.razorpay_signature;
  
//       toast.success("Payment Successful");
  
//       const res = await dispatch(verifyUserPayment(paymentDetails));
  
//       // ✅ FIXED LOGIC
//       if (res?.payload?.success) {
//         navigate("/checkout/success");
//       } else {
//         navigate("/checkout/fail");
//       }
//     },
  
//     prefill: {
//       name: userData.fullName,
//       email: userData.email,
//     },
  
//     theme: {
//       color: "#F37254",
//     },
//   };

//   useEffect(() => {
//     (async () => {
//       await dispatch(getRazorPayId());
//       await dispatch(purchaseCourseBundle());
//     })();
//   }, []);

//   return (
//     <Layout>
//       {/* checkout page container */}
//       <form
//         onSubmit={handleSubscription}
//         className="min-h-[90vh] flex items-center justify-center text-white"
//       >
//         {/* checkout card */}
//         <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
//           <h1 className="absolute top-0 w-full py-4 text-2xl font-bold text-center bg-yellow-500 rounded-tl-lg rounded-tr-lg">
//             Subscription Bundle
//           </h1>

//           <div className="px-4 space-y-5 text-center">
//             <p className="text-[17px]">
//               This purchase will allow you to access all the available courses
//               of our platform for{" "}
//               <span className="font-bold text-yellow-500">1 Year Duration</span>
//               . <br />
//               All the existing and new launched courses will be available to you
//               in this subscription bundle
//             </p>

//             <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
//               <BiRupee /> <span>499</span>only
//             </p>

//             <div className="text-gray-200">
//               <p>100% refund at cancellation</p>
//               <p>* Terms & Condition Applied</p>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="absolute bottom-0 w-full py-2 text-xl font-bold text-center transition-all duration-300 ease-in-out bg-yellow-500 rounded-bl-lg rounded-br-lg hover:bg-yellow-600"
//           >
//             Buy Now
//           </button>
//         </div>
//       </form>
//     </Layout>
//   );
// };

// export default Checkout;


import React, { useEffect } from "react";
import Layout from "../../Layout/Layout";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/razorpaySlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../Redux/authSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Correct state usage
  const razorPayKey = useSelector((state) => state.razorpay.key);
  const order_id = useSelector((state) => state.razorpay.order_id);
  const userData = useSelector((state) => state.auth.data);

  // ✅ Payment handler
  const handleSubscription = async (event) => {
    event.preventDefault();

    if (!razorPayKey || !order_id) {
      toast.error("Payment setup failed");
      return;
    }

    const paymentDetails = {
      razorpay_payment_id: "",
      razorpay_order_id: "",
      razorpay_signature: "",
    };

    const options = {
      key: razorPayKey,
      amount: 499 * 100,
      currency: "INR",
      order_id: order_id,
      name: "Coursify Pvt. Ltd.",
      description: "Course Purchase",

      handler: async function (response) {
        paymentDetails.razorpay_payment_id =
          response.razorpay_payment_id;
        paymentDetails.razorpay_order_id =
          response.razorpay_order_id;
        paymentDetails.razorpay_signature =
          response.razorpay_signature;

        toast.success("Payment Successful");

        const res = await dispatch(
          verifyUserPayment(paymentDetails)
        );

        console.log("VERIFY RESPONSE:", res);

        // ✅ Correct redirect logic
        if (res?.payload?.success) {
          await dispatch(getUserData());
          navigate("/checkout/success");
        } else {
          navigate("/checkout/fail");
        }
      },

      prefill: {
        name: userData?.fullName,
        email: userData?.email,
      },

      theme: {
        color: "#F37254",
      },
    };

    // ✅ Open Razorpay popup
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // ✅ Fetch key + order id
  useEffect(() => {
    (async () => {
      await dispatch(getRazorPayId());
      await dispatch(purchaseCourseBundle());
    })();
  }, [dispatch]);

  return (
    <Layout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">

          <h1 className="absolute top-0 w-full py-4 text-2xl font-bold text-center bg-yellow-500 rounded-tl-lg rounded-tr-lg">
            Subscription Bundle
          </h1>

          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px]">
              This purchase will allow you to access all courses for{" "}
              <span className="font-bold text-yellow-500">
                1 Year Duration
              </span>
              .
              <br />
              All existing and new courses will be available.
            </p>

            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee /> <span>499</span> only
            </p>

            <div className="text-gray-200">
              <p>100% refund at cancellation</p>
              <p>* Terms & Condition Applied</p>
            </div>
          </div>

          <button
            type="submit"
            className="absolute bottom-0 w-full py-2 text-xl font-bold text-center bg-yellow-500 rounded-bl-lg rounded-br-lg hover:bg-yellow-600"
          >
            Buy Now
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Checkout;
