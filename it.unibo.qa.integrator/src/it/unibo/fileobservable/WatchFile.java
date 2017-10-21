package it.unibo.fileobservable;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardWatchEventKinds;
import java.nio.file.WatchEvent;
import java.nio.file.WatchKey;
import java.nio.file.WatchService;
import java.util.List;

public class WatchFile {

	
	public static void test() {
		//Path myDir = Paths.get("C:/xxx");       
		Path myDir = Paths.get("C:/repoGitHub/it.unibo.qa.integrator/src/it/unibo/fileobservable/"); 
for(int i=1; i<=3; i++) {

	    try {
	       WatchService watcher = myDir.getFileSystem().newWatchService();
	       myDir.register(watcher, StandardWatchEventKinds.ENTRY_CREATE, 
	       StandardWatchEventKinds.ENTRY_DELETE, StandardWatchEventKinds.ENTRY_MODIFY);
	       System.out.println("WATCHING 1");
	       WatchKey watckKey = watcher.take();
	       System.out.println("WATCHING 2");
	       List<WatchEvent<?>> events = watckKey.pollEvents();
	       for (WatchEvent event : events) {
	            if (event.kind() == StandardWatchEventKinds.ENTRY_CREATE) {
	                System.out.println("Created: " + event.context().toString());
	            }
	            if (event.kind() == StandardWatchEventKinds.ENTRY_DELETE) {
	                System.out.println("Delete: " + event.context().toString());
	            }
	            if (event.kind() == StandardWatchEventKinds.ENTRY_MODIFY) {
	                System.out.println("Modify: " + event.context().toString());
	            }
	        }

	    } catch (Exception e) {
	        System.out.println("Error: " + e.toString());
	    }
	}//for		
	}	 
	public static void main(String[] args) {
		WatchFile.test();
	}
}
