package ca.chalister;

public class GetMeter {
    private String[] STRESS_PATTERNS;
    private String[] SYLLABLE_COUNTS;

    private String FILTER_STRESSPATTERN;
    private String FILTER_NUMBEROFSYLLABLES;

    {
        STRESS_PATTERNS = "/ /x x/ // /xx x/x xx/ /xxx x/xx xx/x xxx/".split(" ");
        SYLLABLE_COUNTS = "123456789".split(" ");
    }

    public void filterMeter (String stressPattern) {

        FILTER_STRESSPATTERN = stressPattern;

    }

    public void getResults () {

    }
}
