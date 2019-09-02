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

        String footType = FOOT_TYPE.toLowerCase();

        switch (footType) {
            case "pyrrhus", "dibrach":
                footType = DY_PYYRHUS;
            case "iamb", "iambus", "jambus":
                footType = DY_IAMB;
            case "trochee", "choree", "choreus":
                footType = DY_TROCHEE;
            case "spondee":
                footType = DY_SPONDEE;
            case "tribach":
                footType = TRY_TRIBACH;
            case "dactyl":
                footType = TRY_DACTYL;
            case "amphibrach":
                footType = TRY_AMPHIBRACH;
            case "anapest", "antidactylus":
                footType = TRY_ANAPEST;
            case "bacchius":
                footType = TRY_BACCHIUS;
            case "cretic", "amphimacer":
                footType = TRY_CRETIC;
            case "antibacchius":
                footType = TRY_ANTIBACCHIUS;
            case "molossus":
                footType = TRY_MOLOSSUS;
            case "tetrabrach", "proceleusmatic":
                footType = TETRA_TETRABRACH;
            case "primus paeon":
                footType = TETRA_PRIMUS;
            case "secundus paeon":
                footType = TETRA_PRIMUS_SECUNDUS;
            case "tertius paeon":
                footType = TETRA_PRIMUS_TERTIUS;
            case "quartus paeon":
                footType = TETRA_PRIMUS_QUARTUS;
            case "major ionic", "double trochee":
                footType = TETRA_IONIC_MAJOR;
            case "minor ionic", "double iamb":
                footType = TETRA_IONIC_MINOR;
            case "ditrochee":
                footType = TETRA_DITROCHEE;
            case "diiamb":
                footType = TETRA_DIIAMB;
            case "choriamb":
                footType = TETRA_CHORIAMB;
            case "antispast":
                footType = TETRA_ANTISPAST;
            case "first epitrite":
                footType = TETRA_EPITRITE_FIRST;
            case "second epitrite":
                footType = TETRA_EPITRITE_SECOND;
            case "third epitrite":
                footType = TETRA_EPITRITE_THIRD;
            case "fourth epitrite":
                footType = TETRA_EPITRITE_FOURTH;
            case "dispondee":
                footType = DISPONDEE;
            default:
                System.out.println("Invalid string");
        }

        this.FOOT_TYPE = footType;

    }

    public String getFootType () {

        return this.FOOT_TYPE;

    }

    public String layBars () {

        Scanner input = new Scanner(System.in);

        while (true) {

            System.out.println("Enter bar count: ");

            boolean hasNextInt = input.hasNextInt();

            if (hasNextInt) {

                this.BAR_COUNT = input.nextInt();

            } else {

                System.out.println(INVALID_MESSAGE_STRING);
                break;

            }

            input.nextLine();

            System.out.println("Enter measures per bar: ");

            hasNextInt = input.hasNextInt();

            if (hasNextInt) {

                this.MEASURES_PER_BAR = input.nextInt();

            } else {

                System.out.println(INVALID_MESSAGE_STRING);
                break;

            }

            input.nextLine();

            System.out.println("Enter feet per measure: ");

            hasNextInt = input.hasNextInt();

            if (hasNextInt) {

                this.FEET_PER_MEASURE = input.nextInt();

            } else {

                System.out.println(INVALID_MESSAGE_STRING);
                break;

            }

            input.nextLine();

            System.out.println("Enter feet type, as a string: ");

            boolean hasNextString = input.hasNext(getFootType());

            if (hasNextString) {

                this.FOOT_TYPE = input.next();

            } else {

                System.out.println(INVALID_MESSAGE_STRING);
                break;

            }

        }

        for (int bars = BAR_COUNT; bars > 0; bars--) {

            System.out.println("{ ");

            for (int measures = MEASURES_PER_BAR; measures > 0; measures--) {

                System.out.println(" ( ");

                for (int feet = FEET_PER_MEASURE; feet > 0; feet--) {

                    System.out.println(FOOT_TYPE + " | ");

                }

                System.out.println(" ) ");

            }

            System.out.println(" }");
        }

        String feetStructure = (FOOT_TYPE + " | ");
        String measureStructure = (" ( " + feetStructure + " ) ");
        String barStructure = ("{ " + measureStructure + " }");

        return barStructure;
    }

}
