// import { PostHog } from "posthog-node";
import { env } from "../../environment";

export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

// ANSI color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
};

// Color mapping for log levels
const levelColors = {
  [LogLevel.DEBUG]: colors.gray,
  [LogLevel.INFO]: colors.blue,
  [LogLevel.WARN]: colors.yellow,
  [LogLevel.ERROR]: colors.red,
};

type LogData = Record<string, any>;

// Initialize PostHog client
// let posthogClient: PostHog | null = null;

// if (env.POSTHOG_API_KEY) {
//   posthogClient = new PostHog(env.POSTHOG_API_KEY, {
//     host: env.POSTHOG_HOST,
//     flushAt: 1, // Send events immediately in development
//     flushInterval: 1000, // Flush every second
//   });

//   // Graceful shutdown
//   process.on("SIGINT", async () => {
//     if (posthogClient) {
//       await posthogClient.shutdown();
//     }
//   });

//   process.on("SIGTERM", async () => {
//     if (posthogClient) {
//       await posthogClient.shutdown();
//     }
//   });
// }

class Logger {
  private formatForConsole(
    level: LogLevel,
    message: string,
    data?: LogData
  ): string {
    const timestamp = new Date().toISOString();
    const color = levelColors[level];
    const levelText = level.toUpperCase().padEnd(5);

    // Only add colors if we're in a TTY (terminal) environment
    const isColorSupported =
      process.stdout.isTTY && env.NODE_ENV !== "production";

    if (isColorSupported) {
      const coloredLevel = `${color}${colors.bright}${levelText}${colors.reset}`;
      const coloredTimestamp = `${colors.gray}${timestamp}${colors.reset}`;
      let formattedMessage = `${coloredTimestamp} ${coloredLevel} ${message}`;

      if (data && Object.keys(data).length > 0) {
        const dataString = JSON.stringify(data, null, 2);
        formattedMessage += `\n${colors.dim}${dataString}${colors.reset}`;
      }

      return formattedMessage;
    } else {
      // Fallback to plain text for production or non-TTY environments
      let formattedMessage = `${timestamp} ${levelText} ${message}`;
      if (data && Object.keys(data).length > 0) {
        formattedMessage += `\n${JSON.stringify(data, null, 2)}`;
      }
      return formattedMessage;
    }
  }

  private log(level: LogLevel, message: string, data?: LogData) {
    const timestamp = new Date().toISOString();
    const logObject = {
      level,
      timestamp,
      message,
      ...data,
    };

    // Output colored logs to the console for development
    if (env.NODE_ENV === "development") {
      console.log(this.formatForConsole(level, message, data));
    }

    // Send logs to PostHog for analytics and monitoring
    // if (posthogClient) {
    //   try {
    //     // Determine distinct ID from context
    //     const distinctId =
    //       data?.userId?.toString() ||
    //       data?.telegramChatId?.toString() ||
    //       data?.alertId?.toString() ||
    //       "my-app";

    //     // Create event name based on log level and context
    //     const eventName = this.createEventName(level, message, data);

    //     posthogClient.capture({
    //       distinctId,
    //       event: eventName,
    //       properties: {
    //         ...logObject,
    //         // Add system context
    //         environment: env.NODE_ENV || "development",
    //         service: "my-app",
    //         hostname: env.HOSTNAME || "unknown",
    //         version: env.npm_package_version || "1.0.0",
    //       },
    //     });
    //   } catch (error) {
    //     // Don't let PostHog errors break the application
    //     console.error("Failed to send log to PostHog:", error);
    //   }
    // }
  }

  private createEventName(
    level: LogLevel,
    message: string,
    data?: LogData
  ): string {
    // Create meaningful event names for different log types
    if (data?.alertId) return `Alert ${level}: ${message}`;
    if (data?.userId) return `User ${level}: ${message}`;
    // and so on

    // Fallback to generic system event
    return `System ${level}: ${message}`;
  }

  public debug(message: string, data?: LogData) {
    // You might want to log debug messages only in development
    if (env.NODE_ENV !== "production") {
      this.log(LogLevel.DEBUG, message, data);
    }
  }

  public info(message: string, data?: LogData) {
    this.log(LogLevel.INFO, message, data);
  }

  public warn(message: string, data?: LogData) {
    this.log(LogLevel.WARN, message, data);
  }

  public error(message: string, error: Error, data?: LogData) {
    this.log(LogLevel.ERROR, message, {
      ...data,
      error: {
        message: error.message,
        stack: error.stack,
      },
    });
  }
}

export const logger = new Logger();
