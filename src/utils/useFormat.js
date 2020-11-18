export default function useFormat() {
  const formatLatLng = (data) => {
    const formatedLatLng = [];

    formatedLatLng.push(data.lat);
    formatedLatLng.push(data.lng);

    return formatedLatLng;
  };

  const formatDate = (date) => {
    const YYYY = date.substring(0, 4);
    const MM = date.substring(4, 6);
    const DD = date.substring(6, 8);
    const HH = date.substring(8, 10);
    const mm = date.substring(10, 12);
    const formatedDate = `${YYYY}/${MM}/${DD} ${HH}:${mm}`;

    return formatedDate;
  };

  return {
    formatLatLng,
    formatDate,
  };
}
