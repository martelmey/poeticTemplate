// 1.) Parse input (from System.in, or a file)
// 2.) Pass object to WordsAPI (syllables endpoint)
// 3.) Get list of syllables, save to fields

package ca.chalister;

import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

import java.io.IOException;
import java.net.URL;

public class GetMeter {

    private String word;
    private URL url;
    private String syl1;
    private String syl2;
    private String syl3;
    private String syl4;

    public GetMeter() throws IOException {
    }

    public GetMeter(String word) throws IOException {
        this.word = word;
        this.url = new URL("https://wordsapiv1.p.rapidapi.com/words/" + word + "/syllables");
    }

    public String getWord() {
        return this.word;
    }

    public URL getUrl() {
        return this.url;
    }

    OkHttpClient client = new OkHttpClient();

    Request request = new Request.Builder()
            .url("https://wordsapiv1.p.rapidapi.com/words/incredible/syllables")
            .get()
            .addHeader("x-rapidapi-host", "wordsapiv1.p.rapidapi.com")
            .addHeader("x-rapidapi-key", "8726e90acamshf09a7a71014ab56p1cc6bbjsn7dee9b6954f6")
            .build();

    Response response = client.newCall(request).execute();
}
