import { NavigationItem } from "@/types/navigation.types";

export const navigationData: NavigationItem[] = [
  {
    id: "1",
    label: "Promocje",
    url: "https://rc32141.redcart.pl/promocje",
    children: [
      {
        id: "2",
        label: "Ostatnie 7 dni",
        url: "https://rc32141.redcart.pl/7dni",
        children: [
          {
            id: "3",
            label: "Najlepsze",
            url: "https://rc32141.redcart.pl/najlepsze",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    label: "Diamenty forbesa",
    url: "https://www.forbes.pl/diamenty",
    children: [],
  },
];
