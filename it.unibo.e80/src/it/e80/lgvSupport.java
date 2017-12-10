package it.e80;

import it.unibo.qactors.akka.QActor;

public class lgvSupport {

	public static void askReady( QActor qa, String source, String lgvName) { 
		 try {
			String dest = qa.getName().replace("_ctrl", "");
//			qa.println("askReady " + lgvName + " answerTo:" + dest);
			qa.sendMsg("lgvReady", dest, "dispatch", "lgvReady(SOURCE,LGV,true)".replace("SOURCE", source).replace("LGV", lgvName) );
		} catch (Exception e) {
 			e.printStackTrace();
		}
	}
	
	
}
