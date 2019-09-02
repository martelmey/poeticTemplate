package ca.chalister;

public class Main {

    public static void main(String[] args) {

        LayBars poem = new LayBars();

        poem.setBarCount(4);
        poem.setMeasuresPerBar(4);
        poem.setFeetPerMeasure(5);
        poem.setFootType("iamb");

        System.out.println(poem.layBars());

    }

}
