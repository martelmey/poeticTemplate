package ca.chalister;

import java.util.Scanner;

public class LayBars {

    // Two syllables
    private final String DY_PYYRHUS = " ** ";
    private final String DY_IAMB = " */ ";
    private final String DY_TROCHEE = " /* ";
    private final String DY_SPONDEE = " // ";

    // Three syllables
    private final String TRY_TRIBACH = " *** ";
    private final String TRY_DACTYL = " /** ";
    private final String TRY_AMPHIBRACH = "";
    private final String TRY_ANAPEST = " */* ";
    private final String TRY_BACCHIUS = " *// ";
    private final String TRY_CRETIC = " /*/ ";
    private final String TRY_ANTIBACCHIUS = " **/ ";
    private final String TRY_MOLOSSUS = " *** ";

    // Four syllables
    private final String TETRA_TETRABRACH = " **** ";
    private final String DISPONDEE = "////";
    private final String TETRA_PRIMUS = " /*** ";
    private final String TETRA_PRIMUS_SECUNDUS = " */** ";
    private final String TETRA_PRIMUS_TERTIUS = " **/* ";
    private final String TETRA_PRIMUS_QUARTUS = " ***/ ";
    private final String TETRA_IONIC_MAJOR = " //** ";
    private final String TETRA_IONIC_MINOR = " **// ";
    private final String TETRA_DITROCHEE = " /*/* ";
    private final String TETRA_DIIAMB = " */*/ ";
    private final String TETRA_CHORIAMB = " /**/ ";
    private final String TETRA_ANTISPAST = " *//* ";
    private final String TETRA_EPITRITE_FIRST = " */// ";
    private final String TETRA_EPITRITE_SECOND = " */** ";
    private final String TETRA_EPITRITE_THIRD = " //*/ ";
    private final String TETRA_EPITRITE_FOURTH = " ///* ";

    private final String INVALID_MESSAGE_STRING = "Invalid value";

    // Decorations:
    // bar_start = " { ";
    // bar_end = " } ";
    // measure_start = " ( ";
    // measure_end = " ) ";
    // foor_divider = " | ";

    // Meter composition
    public int BAR_COUNT = 0;
    public int MEASURES_PER_BAR = 0;
    public int FEET_PER_MEASURE = 0;
    public String FOOT_TYPE = "";

    public void setBarCount (int BAR_COUNT) {
        if (BAR_COUNT > 0) {
            this.BAR_COUNT = BAR_COUNT;
        } else {
            System.out.println(INVALID_MESSAGE_STRING);
        }
    }

    public void setMeasuresPerBar (int MEASURES_PER_BAR) {
        if (MEASURES_PER_BAR > 0) {
            this.MEASURES_PER_BAR = MEASURES_PER_BAR;
        } else {
            System.out.println(INVALID_MESSAGE_STRING);
        }
    }

    public void setFeetPerMeasure (int FEET_PER_MEASURE) {
        if (FEET_PER_MEASURE > 0) {
            this.FEET_PER_MEASURE = FEET_PER_MEASURE;
        } else {
            System.out.println(INVALID_MESSAGE_STRING);
        }
    }

    public void setFootType (String FOOT_TYPE) {
         if ((FOOT_TYPE == "pyrrhus") || (FOOT_TYPE == "dibrach")) {
             this.FOOT_TYPE = DY_PYYRHUS;
         } else if ((FOOT_TYPE == "iamb") || (FOOT_TYPE == "iambus") || (FOOT_TYPE == "jambus")) {
             this.FOOT_TYPE = DY_IAMB;
         } else if ((FOOT_TYPE == "trochee") || (FOOT_TYPE == "choree") || (FOOT_TYPE == "choreus")) {
             this.FOOT_TYPE = DY_TROCHEE;
         } else if (FOOT_TYPE == "spondee") {
             this.FOOT_TYPE = DY_SPONDEE;
         } else if (FOOT_TYPE == "tribach") {
             this.FOOT_TYPE = TRY_TRIBACH;
         } else if (FOOT_TYPE == "dactyl") {
             this.FOOT_TYPE = TRY_DACTYL;
         } else if (FOOT_TYPE == "amphibrach") {
             this.FOOT_TYPE = TRY_AMPHIBRACH;
         } else if ((FOOT_TYPE == "anapest") || (FOOT_TYPE == "antidactylus")) {
             this.FOOT_TYPE = TRY_ANAPEST;
         } else if (FOOT_TYPE == "bacchius") {
             this.FOOT_TYPE = TRY_BACCHIUS;
         } else if ((FOOT_TYPE == "cretic") || (FOOT_TYPE == "amphimacer")) {
             this.FOOT_TYPE = TRY_ANTIBACCHIUS;
         } else if (FOOT_TYPE == "molossus") {
             this.FOOT_TYPE = TRY_MOLOSSUS;
         } else if ((FOOT_TYPE == "tetrabrach") || (FOOT_TYPE == "proceleusmatic")) {
             this.FOOT_TYPE = TETRA_TETRABRACH;
         } else if (FOOT_TYPE == "primus paeon") {
             this.FOOT_TYPE = TETRA_PRIMUS;
         } else if (FOOT_TYPE == "secundus paeon") {
             this.FOOT_TYPE = TETRA_PRIMUS_SECUNDUS;
         } else if (FOOT_TYPE == "tertius paeon") {
             this.FOOT_TYPE = TETRA_PRIMUS_TERTIUS;
         } else if (FOOT_TYPE == "quartus paeon") {
             this.FOOT_TYPE = TETRA_PRIMUS_QUARTUS;
         } else if ((FOOT_TYPE == "major ionic") || (FOOT_TYPE == "double trochee")) {
             this.FOOT_TYPE = TETRA_IONIC_MAJOR;
         } else if ((FOOT_TYPE == "minor ionic") || (FOOT_TYPE == "double iamb")) {
             this.FOOT_TYPE = TETRA_IONIC_MINOR;
         } else if (FOOT_TYPE == "ditrochee") {
             this.FOOT_TYPE = TETRA_DITROCHEE;
         } else if (FOOT_TYPE == "diiamb") {
             this.FOOT_TYPE = TETRA_DIIAMB;
         } else if (FOOT_TYPE == "choriamb") {
             this.FOOT_TYPE = TETRA_CHORIAMB;
         } else if (FOOT_TYPE == "antispast") {
             this.FOOT_TYPE = TETRA_ANTISPAST;
         } else if (FOOT_TYPE == "first epitrite") {
             this.FOOT_TYPE = TETRA_EPITRITE_FIRST;
         } else if (FOOT_TYPE == "second epitrite") {
             this.FOOT_TYPE = TETRA_EPITRITE_SECOND;
         } else if (FOOT_TYPE == "third epitrite") {
             this.FOOT_TYPE = TETRA_EPITRITE_THIRD;
         } else if (FOOT_TYPE == "fourth epitrite") {
             this.FOOT_TYPE = TETRA_EPITRITE_FOURTH;
         } else if (FOOT_TYPE == "dispondee") {
             this.FOOT_TYPE = DISPONDEE;
         } else {
             System.out.println("Invalid string");
         }
    }

    public int getBarCount () {
        return this.BAR_COUNT;
    }

    public int getMeasuresPerBar () {
        return this.MEASURES_PER_BAR;
    }

    public int getFeetPerMeasure () {
        return this.FEET_PER_MEASURE;
    }

    public String getFootType () {
        return this.FOOT_TYPE;
    }

    public void layBars () {

        System.out.println("Bar count: " + BAR_COUNT + ", Measures per bar: " + MEASURES_PER_BAR + ", Feet per measure: " + FEET_PER_MEASURE + ", Foot type: " + FOOT_TYPE);

        for (int bars = BAR_COUNT; bars > 0; bars--) {
            System.out.print("{ ");
            for (int measures = MEASURES_PER_BAR; measures > 0; measures--) {
                System.out.print(" (( ");
                for (int feet = FEET_PER_MEASURE; feet > 0; feet--) {
                    System.out.print(FOOT_TYPE + " | ");
                }
                System.out.print(" )) ");
            }
            System.out.print(" }");
            System.out.println();
        }
    }
}
