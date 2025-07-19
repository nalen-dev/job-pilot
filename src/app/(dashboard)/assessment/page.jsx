import React from "react";
import Card from "./_components/card";

function page() {
  const conds = true;

  return (
    <section>
      {conds ? (
        <div className="mt-5 flex gap-5 flex-wrap">
          <Card />
          <Card />

          <Card />
          <Card />
          <Card />
        </div>
      ) : (
        <h3 className="w-full mt-80 flex justify-center text-gray-500">
          You don't have any assessment yet, find your missing pieces first!
        </h3>
      )}
    </section>
  );
}

export default page;
