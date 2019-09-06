package ca.chalister;

import java.io.IOException;

public class Main {

    public static void main(String[] args) throws IOException {

//        LayBars poem = new LayBars();
//
//        poem.setBarCount(4);
//        poem.setMeasuresPerBar(2);
//        poem.setFeetPerMeasure(5);
//        poem.setFootType("iamb");
//
//        poem.layBars();

        GetMeter meter = new GetMeter("masterful");
        System.out.println(meter.getUrl());
        System.out.println(meter.getWord());

    }

}
