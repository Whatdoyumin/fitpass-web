export {};

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao {
    namespace maps {
      function load(callback: () => void): void;

      // 명시적으로 필요한 객체들의 타입을 선언
      class Map {
        constructor(container: HTMLElement, options: MapOptions);
      }

      class LatLng {
        constructor(lat: number, lng: number);
      }

      class Marker {
        constructor(options: { position: LatLng; map: Map });
      }

      class InfoWindow {
        constructor(options: { content: string });
        open(map: Map, marker: Marker): void;
      }

      interface MapOptions {
        center: LatLng | Coords;
        level: number;
      }

      namespace services {
        class Places {
          keywordSearch(
            keyword: string,
            callback: (
              data: PlacesSearchResultItem[],
              status: string,
              pagination: Pagination
            ) => void
          ): void;
        }

        interface PlacesSearchResultItem {
          place_name: string;
          address_name: string;
          road_address_name?: string;
          phone?: string;
          x: number;
          y: number;
        }

        interface Pagination {
          totalCount: number;
          current: number;
          last: number;
          gotoPage: (page: number) => void;
        }

        enum Status {
          OK = "OK",
          ZERO_RESULT = "ZERO_RESULT",
          ERROR = "ERROR",
        }

        class Geocoder {
          constructor();
          coord2Address(
            lng: number,
            lat: number,
            callback: (result: AddressResult[], status: Status) => void
          ): void;
        }

        interface AddressResult {
          road_address?: {
            address_name: string;
          };
          address: {
            address_name: string;
          };
        }
      }
    }
  }

  interface Window {
    kakao: typeof kakao;
  }
}
