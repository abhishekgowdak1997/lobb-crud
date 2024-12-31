import { makeAutoObservable } from "mobx";
import stringSimilarity from "string-similarity";

class CityStore {
  city = "";
  zone = "";
  branch = "";
  data: { city_name: string; zone: string; branch: string }[] = [];
  branches: { branch_id: string; branch_name: string }[] = [];
  filteredData: { city_name: string; zone: string; branch: string }[] = [];

  constructor() {
    makeAutoObservable(this); 
  }

  setCity(value: string) {
    this.city = value;
    this.filterData();
  }

  setZone(value: string) {
    this.zone = value;
    this.filterData();
  }

  setBranch(value: string) {
    this.branch = value;
    this.filterData();
  }

  setData(data: { city_name: string; zone: string; branch: string }[]) {
    this.data = data;
    this.filterData();
  }

  setBranches(branches: { branch_id: string; branch_name: string }[]) {
    this.branches = branches;
  }

  filterData() {
    this.filteredData = this.data.filter((row) => {
      return (
        (this.city ? row.city_name.toLowerCase().includes(this.city.toLowerCase()) : true) &&
        (this.zone ? row.zone === this.zone : true) &&
        (this.branch ? row.branch === this.branch : true)
      );
    });
  }

  async fetchData() {
    try {
      const response = await fetch(
        `https://1a77d97a-9cb6-4ff6-9389-54c70d8bf298.mock.pstmn.io/pipe/city`
      );
      const result = await response.json();
      if (result.Data) {
        this.setData(result.Data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async fetchBranches() {
    try {
      const response = await fetch(
        `https://1a77d97a-9cb6-4ff6-9389-54c70d8bf298.mock.pstmn.io/pipe/branches`
      );
      const result = await response.json();
      if (result.Data) {
        this.setBranches(result.Data);
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  }

  // Add City Method
  async addCity(payload: { city_name: string; zone: string; branch: string }) {
    try {
      const response = await fetch(
        "https://1a77d97a-9cb6-4ff6-9389-54c70d8bf298.mock.pstmn.io/pipe/city",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("City added successfully:", data);
        this.data.push(payload);
        this.filterData();
      } else {
        const errorData = await response.json();
        console.error("Failed to add city:", errorData);
      }
    } catch (error) {
      console.error("Error adding city:", error);
    }
  }

  async editCity(payload: { city_name: string; zone: string; branch: string }) {
    try {
      const response = await fetch(
        "https://1a77d97a-9cb6-4ff6-9389-54c70d8bf298.mock.pstmn.io/pipe/update-cities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        console.log("City updated successfully:", data);
  
        // Update the specific city in the local `data` array
        const normalizedPayloadCity = payload.city_name.trim().toLowerCase();
        const cityNames = this.data.map((city) =>
          city.city_name.trim().toLowerCase()
        );
  
        const bestMatch = stringSimilarity.findBestMatch(
          normalizedPayloadCity,
          cityNames
        );
  
        console.log("Best match for city_name:", bestMatch);
  
        if (bestMatch.bestMatch.rating > 0.8) {
          const index = cityNames.indexOf(bestMatch.bestMatch.target);
          this.data[index] = { ...this.data[index], ...payload };
          console.log("Updated city in local data:", this.data[index]);
          this.filterData();
        } else {
          console.warn(
            `City not found or match too low for: ${payload.city_name}`
          );
        }
      } else {
        const errorData = await response.json();
        console.error("Failed to update city:", errorData);
      }
    } catch (error) {
      console.error("Error updating city:", error);
    }
  }
  
  
}  

const cityStore = new CityStore();
export default cityStore;
