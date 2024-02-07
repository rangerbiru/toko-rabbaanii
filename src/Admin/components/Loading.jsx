import React, { useEffect, useState } from "react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center h-screen items-center ">
      <span className="loading loading-bars loading-lg bg-red-600"></span>
      <h2 className="mt-2">Loading dulu...</h2>
    </div>
  );
}
