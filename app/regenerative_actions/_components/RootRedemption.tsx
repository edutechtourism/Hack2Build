"use client";

export const RootRedemption = () => {
  return (
    <div className="mt-8 p-6 border rounded-lg shadow bg-gray-900 text-white space-y-4">
      <h2 className="text-2xl font-bold">$ROOT → Seedpack Redemption</h2>

      {/* Placeholder image */}
      <div className="w-full flex justify-center">
        <img
          src="/placeholder-seedpack.png" // replace later with your real image
          alt="Seedpack"
          className="w-48 h-48 object-contain border rounded-md bg-gray-800"
        />
      </div>

      {/* Explanation */}
      <p className="text-gray-300">
        <span className="font-semibold">$ROOT</span> is more than a token —
        it’s a <span className="font-semibold">Digital Currency</span> for
        regeneration. Unlike speculative crypto, $ROOT is directly backed by a
        living treasury: <span className="font-semibold">seed vaults</span>.
      </p>

      <p className="text-gray-300">
        The community ensures that every $ROOT has real value. Farmers and
        educators earn $ROOT for their actions, and holders can{" "}
        <span className="font-semibold">redeem $ROOT for seedpacks</span> —
        returning digital incentives back into soil, food, and biodiversity.
      </p>

      {/* Call to Action */}
      <button
        className="px-6 py-3 rounded bg-green-600 hover:bg-green-700 text-white font-semibold"
        onClick={() => alert("🌱 Seedpack redemption coming soon!")}
      >
        Redeem Seeds                167 $ROOT to redeem a $10 seedpack 🌱
      </button>
    </div>
  );
};
