type T = {
    id:number,
  title: string,
  place_of_origin: string,
  artist_display:string,
  inscriptions:null,
  date_start:number,
  date_end:number,
};


async function dataFetch(page: number): Promise<{ data: T[]; total: number }> {
    try {
        console.log("Started");
        const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=12`);
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();

        const result: T[] = json.data;
        const total = json.pagination.total; // 👈 total records from API

        return { data: result, total };
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
export  {dataFetch};