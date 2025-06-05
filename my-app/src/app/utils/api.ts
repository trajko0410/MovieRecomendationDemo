import { toast } from "react-hot-toast";

export async function fetchApi({ url }: { url: string }) {
  try {
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_KEY}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error("Unauthorized: Invalid token.");
      if (res.status === 403) throw new Error("Forbidden access.");
      throw new Error(`Failed to fetch movies. Status: ${res.status}`);
    }

    //if (res.ok) {
    //toast.success("Data fetched succesfuly!");
    //}

    const data = await res.json();
    //console.log(data);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error(error.message || "Something went wrong while fetching movies.");
    return []; // Return empty array so the UI doesn't crash
  }
}
