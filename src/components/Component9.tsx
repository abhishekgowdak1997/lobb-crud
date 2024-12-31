import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Pane,
  TextInput,
  Select,
  Button,
  Table,
  Dialog,
  Heading,
  Paragraph,
} from "evergreen-ui";
import cityStore from "../components/Mobx/CityStore.tsx";
import deleteIcon from "../assets/Delete.svg";
import edit from "../assets/Edit.svg";

const Component9 = observer(() => {
  const [addModal, setAddModal] = useState(false);
  const [cityName, setCityName] = useState("");
  const [zone, setZone] = useState("");
  const [branch, setBranch] = useState("");
  const [modalMode, setModalMode] = useState("add");
  const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [cityData, setCityData] = useState({
    cityName: "",
    zone: "",
    branch: "",
  });
  useEffect(() => {
    cityStore.fetchData();
    cityStore.fetchBranches();
  }, []);

  const handleDelete = (index: number) => {
    const updatedData = cityStore.data.filter((_, i) => i !== index);
    cityStore.setData(updatedData);
  };

  const handleAddCity = async () => {
    const payload = {
      city_name: cityName,
      zone: zone,
      branch: branch,
    };
    await cityStore.addCity(payload);
    setAddModal(false);
  };

  const handleEditCity = async () => {
    const payload = {
      city_name: cityData.cityName,
      zone: cityData.zone,
      branch: cityData.branch,
    };

    await cityStore.editCity(payload);
    setAddModal(false);
  };

  const openAddCityModal = () => {
    setModalMode("add");
    setCityName("");
    setZone("");
    setBranch("");
    setAddModal(true);
  };

  const openEditCityModal = (data) => {
    setModalMode("edit");
    setCityData(data);
    setAddModal(true);
  };

  const handleSave = () => {
    if (modalMode === "add") {
      console.log("Adding City:", cityData);
    } else if (modalMode === "edit") {
      console.log("Editing City:", cityData);
    }
    setAddModal(false);
  };

  return (
    <Pane>
      <Pane
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={16}
      >
        <Pane display="flex" alignItems="center" gap={8}>
          <TextInput
            placeholder="Search City"
            value={cityStore.city}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              cityStore.setCity(e.target.value)
            }
          />
          <Select
            value={cityStore.zone}
            width={300}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              cityStore.setZone(e.target.value)
            }
          >
            <option value="">Select Zone</option>
            <option value="South">South</option>
            <option value="North">North</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </Select>
          <Select
            value={cityStore.branch}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              cityStore.setBranch(e.target.value)
            }
          >
            <option value="">Select Branch</option>
            {cityStore.branches.map((branch, index) => (
              <option key={index} value={branch.branch_name}>
                {branch.branch_name}
              </option>
            ))}
          </Select>
        </Pane>
        <Button appearance="primary" fontSize={16} onClick={openAddCityModal}>
          Add City
        </Button>
        <Dialog
          isShown={addModal}
          title={modalMode === "add" ? "Add City" : "Edit City"}
          onCloseComplete={() => setAddModal(false)}
          confirmLabel={modalMode === "add" ? "Add City" : "Save Changes"}
          cancelLabel="Cancel"
          onConfirm={modalMode === "add" ? handleAddCity : handleEditCity}
          onCancel={() => setAddModal(false)}
          width={800}
        >
          <Pane>
            <Paragraph marginBottom={16}>
              {modalMode === "add"
                ? "Please enter the City Name,respective Zone and choose a Branch "
                : "Edit the details below and click 'Save Changes' to update the city."}
            </Paragraph>
            <Pane display="flex" alignItems="center" gap={8}>
              <TextInput
                label="City Name"
                placeholder="Enter city name"
                value={modalMode === "add" ? cityName : cityData.cityName}
                onChange={(e) =>
                  modalMode === "add"
                    ? setCityName(e.target.value)
                    : setCityData({ ...cityData, cityName: e.target.value })
                }
              />
              <Select
                value={modalMode === "add" ? zone : cityData.zone}
                width={300}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  modalMode === "add"
                    ? setZone(e.target.value)
                    : setCityData({ ...cityData, zone: e.target.value })
                }
              >
                <option value="">Select Zone</option>
                <option value="South">South</option>
                <option value="North">North</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </Select>
              <Select
                value={modalMode === "add" ? branch : cityData.branch}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  modalMode === "add"
                    ? setBranch(e.target.value)
                    : setCityData({ ...cityData, branch: e.target.value })
                }
              >
                <option value="">Select Branch</option>
                {cityStore.branches.map((branch, index) => (
                  <option key={index} value={branch.branch_name}>
                    {branch.branch_name}
                  </option>
                ))}
              </Select>
            </Pane>
          </Pane>
        </Dialog>
      </Pane>

      <Table>
        <Table.Head>
          <Table.TextHeaderCell>City</Table.TextHeaderCell>
          <Table.TextHeaderCell>Zone</Table.TextHeaderCell>
          <Table.TextHeaderCell>Branch</Table.TextHeaderCell>
          <Table.TextHeaderCell>Actions</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {cityStore.filteredData.length > 0 ? (
            cityStore.filteredData.map((row, index) => (
              <Table.Row key={index}>
                <Table.TextCell>{row.city_name}</Table.TextCell>
                <Table.TextCell>{row.zone}</Table.TextCell>
                <Table.TextCell>{row.branch}</Table.TextCell>
                <Table.Cell gap={6}>
                  <img
                    src={edit}
                    alt="edit"
                    onClick={() =>
                      openEditCityModal({
                        cityName: row.city_name,
                        zone: row.zone,
                        branch: row.branch,
                      })
                    }
                  />
                  <img
                    src={deleteIcon}
                    alt="delete"
                    onClick={() => {
                      setDeleteIndex(index);
                      setIsDeleteDialogShown(true);
                    }}
                  />
                  <Dialog
                    isShown={isDeleteDialogShown}
                    title="Confirm Deletion"
                    intent="danger"
                    onCloseComplete={() => setIsDeleteDialogShown(false)}
                    confirmLabel="Delete"
                    cancelLabel="Cancel"
                    onConfirm={() => {
                      if (deleteIndex !== null) {
                        handleDelete(deleteIndex);
                      }
                      setIsDeleteDialogShown(false);
                    }}
                  >
                    Are you sure you want to delete this data? This action
                    cannot be undone.
                  </Dialog>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.TextCell colSpan={4} textAlign="center">
                No data found
              </Table.TextCell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Pane>
  );
});

export default Component9;
