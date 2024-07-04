import {
  Slider as NextSlider,
  type SliderProps as NextSliderProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface SliderProps {
  label?: NextSliderProps["label"];
  color?: NextSliderProps["color"];
  size?: NextSliderProps["size"];
  minValue?: NextSliderProps["minValue"];
  maxValue?: NextSliderProps["maxValue"];
  defaultValue?: NextSliderProps["defaultValue"];
  onChangeEnd?: NextSliderProps["onChangeEnd"];
}

export const Slider: FC<SliderProps> = (props) => {
  return <NextSlider {...props} />;
};
