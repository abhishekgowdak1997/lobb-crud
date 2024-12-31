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

  async filterData() {
    const params: Record<string, string> = {};
  
    if (this.city) {
      params.city_name = this.city.trim();
    }
    if (this.zone) {
      params.zone = this.zone.trim();
    }
    if (this.branch) {
      params.branch = this.branch.trim();
    }
  
    const queryString = new URLSearchParams(params).toString();
  
    try {
      const response = await fetch(
        `https://1a77d97a-9cb6-4ff6-9389-54c70d8bf298.mock.pstmn.io/pipe/city?${queryString}`
      );
  
      if (response.ok) {
        const result = await response.json();
        if (result.Data) {
          this.filteredData = result.Data;
        } else {
          this.filteredData = [];
        }
      } else {
      }
    } catch (error) {
      this.filteredData = [];
    }
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
    }
  }

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
        this.data.push(payload);
        this.fetchData();
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
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
        const normalizedPayloadCity = payload.city_name.trim().toLowerCase();
        const cityNames = this.data.map((city) =>
          city.city_name.trim().toLowerCase()
        );
  
        const bestMatch = stringSimilarity.findBestMatch(
          normalizedPayloadCity,
          cityNames
        );
  
        if (bestMatch.bestMatch.rating > 0.8) {
          const index = cityNames.indexOf(bestMatch.bestMatch.target);
          this.data[index] = { ...this.data[index], ...payload };
          this.fetchData();
        } else {
      
        }
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
    }
  }
  
  
}  

const cityStore = new CityStore();
export default cityStore;
