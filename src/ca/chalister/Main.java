package ca.chalister;

public class Main {
    private static final int LARGO_BPM = ((40 + 66) / 2);
    private static final int ADAGIO_BPM = ((67 + 76) / 2);
    private static final int ANDANTE_BPM = ((77 + 108) / 2);
    private static final int MODERATO_BPM = ((109 + 120) / 2);
    private static final int ALLEGRO_BPM = ((121 + 168) / 2);
    private static final int PRESTO_BPM = ((168 + 208) / 2);
    private static final String INVALID_STR_MESSAGE = "Invalid string";

    public static void main(String[] args) {

    }

    public static int tempoNameToBPM(String tempoName) {

        String t = tempoName.toLowerCase();
        int bpm = 0;

        switch (t) {
            case "largo":
                bpm = LARGO_BPM;
                break;
            case "adagio":
                bpm = ADAGIO_BPM;
                break;
            case "andante":
                bpm = ANDANTE_BPM;
                break;
            case "moderato":
                bpm = MODERATO_BPM;
                break;
            case "allegro":
                bpm = ALLEGRO_BPM;
                break;
            case "presto":
                bpm = PRESTO_BPM;
                break;
            default:
                System.out.println(INVALID_STR_MESSAGE);
        }

        return bpm;
    }
}
